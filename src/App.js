import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chats from "./Chats";
const socket = io.connect("https://chat-app-backend-f3lm.onrender.com/");
// const socket = io.connect("http://localhost:3001/");

function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChats, setShowChats] = useState(false);
  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      if (navigator.onLine === true) {
        socket.emit("join_the_room", { username, roomId });
        setShowChats(true);
      } else {
        alert("Please check your Internet Connection...");
      }
    } else {
      alert("Enter the Name and Room Id!");
    }
  };
  return (
    <>
      {showChats == false ? (
        <div className="App">
          <h2
            style={{
              textAlign: "center",
              color: "#03045e",
              margin: "0.7rem",
              marginTop: "2rem",
            }}
          >
            Chat Application!
          </h2>
          <h4 style={{ textAlign: "center", color: "#03045e" }}>
            Developer: PRABHJOT SINGH ARORA
          </h4>
          <div className="main">
            <h3 style={{ color: "#0077b6" }}>Join A Chat</h3>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter the name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="number"
              name="roomId"
              id="roomId"
              placeholder="Enter a room Id"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
            <button id="btn" onClick={joinRoom}>
              Join Room
            </button>
            <div>
              <h5>
                Note: <br />
                <u>1.</u> Kindly do not refresh the page , otherwise all the
                chats will be gone. We don't save this chats to our database
                hence they won't recover. This is a temporary Chat Application.
                <br />
                <u>2.</u> Please avoid using similar names before joining the
                room,it may cause some bugs.
              </h5>
            </div>
          </div>
        </div>
      ) : (
        <Chats socket={socket} username={username} roomId={roomId} />
      )}
    </>
  );
}

export default App;
