import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import { MdNavigateBefore } from 'react-icons/md';
import Menu from "../Menu/Menu";
import TypingDots from "../TypingDots/TypingDots";
import styles from "./Room.module.css";

let socket;

const Room = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
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
  }, [searchParams]);

  // Listen for socket emitter when a message is sent
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    let typingTimer = null;
    socket.on("typing", (data) => {
      clearTimeout(typingTimer);
      if (data.length === 1) {
        setTypingMessage(`${data[0].name} is typing...`);
        typingTimer = setTimeout(() => {
          setTypingMessage(null);
        }, 2000);
      } else if (data.length > 1) {
        setTypingMessage(`${data.length} people are typing...`);
        typingTimer = setTimeout(() => {
          setTypingMessage(null);
        }, 2000);
      }
    });

    socket.on("stoppedTyping", () => {
      setTypingMessage(null);
    });

    return () => {
      clearTimeout(typingTimer);
    }
  });

  // Scrolls to the bottom of the viewport
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
      setMessage('');
    }
  };

  const handleEnterKeySubmit = (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
  };

  const handleTypingStatus = (e) => {
    socket.emit("typing");
    if (e.target.value === '') {
      socket.emit('stoppedTyping');
    };
  };

  const userList = users ? users.map(({name}) => ( 
    <div key={name} className={styles.userItem}>{name}</div>
  )) : null;

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
                    <span className={styles.settings} onClick={() => setMenuOpen(!menuOpen)}>
                        <IoSettingsSharp style={{ fontSize: "0.8rem" }} />
                    </span>
                </h1>
            </header>

            {
              menuOpen ?
                <Menu 
                  setMenuOpen={setMenuOpen}
                  setPassword={setPassword}
                  room={room}
                  userList={userList}
                />
                :
                null
            }
            
            <section className={styles.chatContainer}>
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
                <div className={`${styles.userList} ${styles.isDesktop}`}>
                  {userList}
                </div>
            </section>
            <footer aria-label="Chat Room Input" className={styles.footer}>
                {typingMessage ? 
                  <span className={styles.typingMessage}>
                    <TypingDots />
                    {typingMessage}
                  </span> 
                  : 
                  null
                }
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
                      onKeyUp={(e) => handleTypingStatus(e)}
                      placeholder="Write message..."
                      className={styles.messageInputField}
                      autoComplete="off"
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
