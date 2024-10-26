import React from 'react';
import {useParams} from 'react-router-dom';
import {ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function Room() {
    const {roomId} = useParams();

    const myMeeting = async (element) =>{
        const appID = 926941101;
        const serverSecret = "aed52f7bd7e8b9e30469f7a345c1e96e";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, "123", Date.now().toString(), "Plant Expert")
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
        container: element,
        sharedLinks:[
            {
                name:'copy link',
                url:`http://localhost:5173/room/${roomId}`
            }
        ],
        scenario: {
            mode:ZegoUIKitPrebuilt.OneONoneCall,
        },
    })
    }
  return (
    <div ref={myMeeting}/>
  )
}

export default Room