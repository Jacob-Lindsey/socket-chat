import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { uuid } from "uuidv4";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

// PRODUCTION URL
/* const SOCKET_SERVER_URL = window.location.hostname; */

// DEVELOPMENT URL
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.userID === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        const timestamp = new Date(Date.now()).toLocaleTimeString("en-US");

        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody.text,
            userID: socketRef.current.id,
            user: messageBody.user,
            room: messageBody.room,
            timestamp: timestamp,
        });
    };

    return { messages, sendMessage };
};

export default useChat;