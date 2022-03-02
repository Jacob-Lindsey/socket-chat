import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";
import { BsPersonBadge } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdNavigateBefore } from 'react-icons/md';
import styles from "./Room.module.css";

let socket;

const Room = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState(null);

  const messagesEndRef = useRef(null);

  const [searchParams] = useSearchParams();

  // DEVELOPMENT URL
  const ENDPOINT = "http://localhost:5000";

  // PRODUCTION URL
  /* const ENDPOINT = window.location.hostname; */

  // Instantiate new room if not found in the DB 
  // Else create a new one and add it to DB
  useEffect(() => {
    const name = searchParams.get('name');
    const room = searchParams.get('room');  
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    fetch(window.location.search).then(data => {
      data.json().then((data) => {
        setMessages(data.messages);
      });
    });

    // Use this to see the current snapshot of the DB document, to avoid having the refresh the mongoDB page 
    /* const databaseTest = fetch(window.location.search).then(res => res.json()).then(res => { console.log(res) }); */
    
  }, [searchParams]);

  // Listen for socket emitter when a message is sent
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1)
  };

  // Uses a 'dummy' div at the bottom of the viewport to scroll to on page load, or when a new message is recieved
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("");
    } else alert("empty input");
  };

  const handleEnterKeySubmit = (e) => {
    if (e.key === 'Enter' && message) {
        handleSubmit(e);
    }
  };

  return (
    <main aria-label="Chat Room" className={styles.roomContainer}>
            <header aria-label={room} className={styles.header}>
                <MdNavigateBefore
                    style={{ cursor: "pointer", fontSize: "1.6rem" }}
                    aria-label="Navigate Back"
                    onClick={() => handleNavigate()} 
                />
                <h1 className={styles.roomName}>
                    <div>
                        <span className={styles.hashMark}>#</span>
                        {room}
                        {
                            hasPassword ?
                                <HiLockClosed 
                                    style={{ color: "hsla(137, 100%, 39%, 1)",  fontSize: "1.3rem", margin: "0 0.5rem" }}
                                    aria-label="Room Is Password Protected"
                                />
                            :
                            null
                        }
                    </div>
                    <small 
                      className={styles.username}
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <BsPersonBadge style={{ fontSize: "0.8rem" }} />
                        {name}
                    </small>
                </h1>
            </header>

            {
              menuOpen ?
                <section className={styles.menuContainer}>
                  <IoClose 
                    className={styles.menuClose}
                    aria-label="Close Menu"
                    onClick={() => setMenuOpen(false)}
                  />
                  ROOM SETTINGS
                  <input
                      type="text"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Set Password"
                      className={styles.settingsInputField}
                  />
                </section>
                :
                null
            }
            
            <section className={styles.messagesContainer}>
                <ol className={styles.messagesList}>
                    {messages.map((message, index) => (
                        <li 
                            key={index}
                            className={
                              `${styles.messageItem}
                               ${message.user === name ? styles.myMessage 
                                  : message.user === 'Admin'
                                  ? styles.adminMessage
                                  : styles.recievedMessage
                                }`}
                            >
                            <p className={styles.messageText}>
                                {message.text}
                            </p>
                            <span className={styles.messageDetails}>
                                <small className={styles.messageSender}>{message.user}</small>
                                <small className={styles.messageTimestamp}>{message.timestamp}</small>
                            </span>
                            
                        </li>
                    ))}
                    <div className={styles.messagesEnd} ref={messagesEndRef} />
                </ol>
            </section>
            <footer aria-label="Chat Room Input" className={styles.footer}>
                <form 
                  action=""
                  className={styles.messageInputContainer}
                  onSubmit={handleSubmit}
                >
                  <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      name="chatInput"
                      onKeyDown={(e) => handleEnterKeySubmit(e)}
                      placeholder="Write message..."
                      className={styles.messageInputField}
                  />
                  {message ? 
                      <button
                      type="submit" 
                      className={styles.sendMessageButton}
                      >
                          <AiOutlineSend />
                      </button>
                          :
                      null
                  }
                </form>
            </footer>
        </main>
  );
};

export default Room;
