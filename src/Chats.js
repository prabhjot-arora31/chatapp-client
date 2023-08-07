import React, { useEffect, useMemo, useState, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
// import ScrollToBottom from "react-scroll-to-bottom";
function Chats({ socket, username, roomId }) {
  const [msgList, setMsgList] = useState([]);
  const containerRef = useRef();
  const [copyTextPart, setCopyTextPart] = useState("copyTextPart1");
  const [copyText, setCopyText] = useState("");
  const [currentMsg, setCurrentMsg] = useState("Hey....");
  const [userJoined, setUserJoined] = useState("");
  const sendMessage = async () => {
    if (currentMsg !== "") {
      const msgData = {
        roomId: roomId,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      if (navigator.onLine === true) {
        await socket.emit("send_the_message", msgData);
        setMsgList((list) => [...list, msgData]);
      } else alert("Please check your Internet Connection.....");
    }
    setCurrentMsg("");
  };

  useMemo(() => {
    socket.on("get_message", (data) => {
      setMsgList((list) => [...list, data]);
    });
    // socket.on("show_joined", (data) => {
    //   setUserJoined(data.username);
    //   console.log(`${data.username} joined`);
    // });
    // msgList[0].message ? console.log(msgList[0].message) : null;
  }, [socket]);
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="mainChat">
        <div className="head">Live Chat</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
            border: "2px solid black",
            borderTop: "none",
            borderBottom: "none",
          }}
        >
          <h5
            style={{
              textAlign: "center",
            }}
          >
            Room Id: {roomId}{" "}
          </h5>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(roomId);
              setCopyText("Room ID Copied to clipboard!");
              setCopyTextPart("copyTextPart2");
            }}
          >
            <img
              color="white"
              width="30px"
              src={require("../src/assets/images/yo-copy.png")}
            />
          </div>

          <br />
        </div>

        <div id={`${copyTextPart}`}>
          <p>{copyText}</p>
          <img
            style={{ marginLeft: "12px" }}
            src={require("../src/assets/images/yo-cross.png")}
            width="60px"
            onClick={() => {
              setCopyTextPart("copyTextPart1");
            }}
          />
        </div>
        <div className="body">
          {msgList === [] ? null : (
            <ScrollableFeed style={{ height: "5rem" }}>
              {msgList.map((ele) => {
                return (
                  <>
                    {/* {userJoined && (
                      <h6
                        style={{
                          backgroundColor: "lightblue",
                          width: "200px",
                          marginLeft: "auto",
                          borderRadius: "0.6rem",
                          marginRight: "auto",
                          padding: "0.3rem",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        {userJoined} joined
                      </h6>
                    )} */}
                    <div
                      style={{
                        display: "flex",
                        width: "100%",

                        justifyContent: `${
                          ele.author === username ? "flex-end" : "flex-start"
                        }`,
                      }}
                    >
                      <div
                        style={{
                          // position: "absolute",
                          // right: `${ele.message === currentMsg ? 0 : null}`,
                          width: "200px",
                          paddingLeft: "4px",
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "2.5px",
                          marginBottom: "2.5px",
                          backgroundColor: `${
                            ele.author === username ? "#00b4d8" : "#90e0ef"
                          }`,
                          color: "black",
                          marginRight: "0.5rem",
                          marginLeft: "5px",
                          paddingTop: "3px",
                          paddingBottom: "3px",
                        }}
                      >
                        <h4
                          style={{
                            marginBottom: "0",
                            marginTop: "0",
                            wordWrap: "break-word",
                          }}
                          key={ele.time}
                        >
                          {ele.message}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.4rem",
                            fontSize: "12px",
                            marginBottom: "0",
                          }}
                        >
                          <p
                            key={ele.time}
                            style={{
                              fontWeight: "500",
                              marginTop: "0",
                              marginBottom: "0",
                            }}
                          >
                            {ele.author}
                          </p>
                          <p
                            key={ele.time}
                            style={{ marginTop: "0", marginBottom: "0" }}
                          >
                            {ele.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </ScrollableFeed>
          )}
        </div>
        <div className="footer">
          <textarea
            cols={28}
            rows={2}
            type="text"
            name="messages"
            id="messages"
            value={currentMsg}
            onChange={(e) => {
              setCurrentMsg(e.target.value);
            }}
          />
          <button
            id="btn2"
            style={{ backgroundColor: "#0077b6" }}
            onClick={sendMessage}
          >
            <img
              src={require("../src/assets/images/yo-send2.png")}
              width="30px"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
