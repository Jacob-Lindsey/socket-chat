import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import ChatContainer from "../ChatContainer/ChatContainer";
import ChatInput from "../ChatInput/ChatInput";
import Menu from "../Menu/Menu";
import RoomHeader from "../RoomHeader/RoomHeader";
import { fetchData } from "../../helpers/fetchData";
import { scrollToBottom } from "../../helpers/scrollToBottom";
import styles from "./Room.module.css";

let socket;

const Room = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomData, setRoomData] = useState();
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

  // Instantiate/create new room
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
    fetchData(setMessages, setRoomData);
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

  // Displays a notification if a user is typing, with a 2 second delay after last input
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
    scrollToBottom(messagesEndRef);
  }, [messages]);

  // Routes to the most recent history location 
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1)
  };

  const userList = users ? users.map(({name}) => ( 
    <div key={name} className={styles.userItem}>{name}</div>
  )) : null;

  return (
    <main aria-label="Chat Room" className={styles.roomContainer}>
            <RoomHeader 
              handleNavigate={handleNavigate}
              setMenuOpen={setMenuOpen}
              menuOpen={menuOpen}
              room={room}
              hasPassword={hasPassword}
            />
            {
              menuOpen ?
                <Menu 
                  setMenuOpen={setMenuOpen}
                  hasPassword={hasPassword}
                  setHasPassword={setHasPassword}
                  password={password}
                  setPassword={setPassword}
                  room={room}
                  userList={userList}
                />
                :
                null
            }
            <ChatContainer 
              messages={messages}
              messagesEndRef={messagesEndRef}
              name={name}
              userList={userList}
            />
            <ChatInput
              setMessage={setMessage}
              message={message}
              socket={socket}
              typingMessage={typingMessage}
            />
        </main>
  );
};

export default Room;
