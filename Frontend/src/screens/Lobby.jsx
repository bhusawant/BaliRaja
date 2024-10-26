import {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import {useSocket} from '../context/SocketProvider'

function lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const handleSubmitForm = useCallback( (e) => {
    e.preventDefault();
    console.log(email);
    navigate(`/room/${room}`);
  }, [email,room]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}

export default lobby