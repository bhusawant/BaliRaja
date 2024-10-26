import React, { useState } from 'react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import detectcss from './detectcss.module.scss'
import Markdown from 'react-markdown'
import accorcss from './accordion.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Detect() {
  const [errormsg, setErrormsg] = useState('Error in image processing');
  const [showLoading, setShowLoading] = useState(false);
  const [showLoading2, setShowLoading2] = useState(false);
  const [llamaResponse, setLlamaResponse] = useState(null);
  const [openAcc, setOpenAcc] = useState(false)
  const fileTypes = ["JPG", "PNG", "GIF"];

  const [fileData, setFileData] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (file) => {
    if (file) {
      try {
        const imageData = await loadImageBase64(file);
        setFileData(imageData);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
  }

  const notify = () => toast.warn(`${errormsg}`);

  const handleDetectClick = async () => {
    if (fileData) {
      try {
        setShowLoading(!showLoading2)
        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/plants-diseases-detection-and-classification/12',
          params: {
            api_key: 'NuVKki2nV2l1R8EEhXRj',
          },
          data: fileData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        setDetectionResult(response.data);
        setShowLoading(!showLoading2)
      } catch (error) {
        console.error('Error detecting diseases:', error.message);
        setErrormsg(`Error detecting diseases: ${error.message}`);
        notify();
      }
    } else {
      console.error('No image uploaded.');
      setErrormsg('No Image Detected !!!')
      notify();
    }
  };

  async function getLlamaResponse() {
    setShowLoading(true);
    try {
      const response = await axios.post(process.env.LLAMA_API_ENDPOINT, {
        prompt: `What is ${detectionResult.predictions[0].class} and give its cure if it is a plant disease. Please use easy english.`,
        // Add any other parameters required by your Llama API
        max_tokens: 500,
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + process.env.LLAMA_API_KEY
        }
      });

      setLlamaResponse(response.data.text || response.data.generated_text); // Adjust based on your API response structure
      setShowLoading(false);
    } catch (error) {
      console.error('Error getting Llama response:', error);
      setErrormsg('Error getting AI response');
      notify();
      setShowLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={`${detectcss.container} flexverti`}>
        <h1>Just upload the image of observed disease and get the cure on a snap !!</h1>
        <div className={detectcss.inputdiv}></div>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        <div className={detectcss.showimg}>
          {fileData && <img src={fileData} alt="Uploaded" />}
        </div>
        <button onClick={handleDetectClick} className={detectcss.btn1}>Detect Diseases</button>
        <h4 onClick={getLlamaResponse} className={`${detectcss.invisible} ${detectcss.btn1}`}>Get Cures with AI</h4>
        {showLoading && !detectionResult && (<div className={detectcss.loader}></div>)}
        {detectionResult && (
          <div className={detectcss.results}>
            <h3>Detection Result:</h3>
            <p>{detectionResult.predictions.length >= 1 ? (detectionResult.predictions[0].class) : 'No disease detected'}</p>

            <div className={accorcss.accordion}>
              <div className={`${accorcss['accordion-item']} ${openAcc ? accorcss.open : ''} flexverti`}>
                <div className={`${accorcss.title} flexhori`} onClick={() => { setOpenAcc(!openAcc) }}>
                  Description of Disease
                  {openAcc ? <i className="ri-arrow-drop-up-line"></i> : <i className="ri-arrow-drop-down-line"></i>}
                </div>
                {showLoading && !llamaResponse && detectionResult.predictions.length >= 1 ? (<div className={detectcss.loader}></div>) : ""}
                <div className={accorcss.content}>
                  {llamaResponse && (<Markdown>{llamaResponse}</Markdown>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}