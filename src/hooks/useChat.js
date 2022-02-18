import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
/* const SOCKET_SERVER_URL = process.env.NODE_ENV === 'production' ? "https://ssockchat.herokuapp.com/" : "http://localhost:4000"; */
const SOCKET_SERVER_URL = socketIOClient.io(window.location.origin);

const useChat = (roomId) => {
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
            username: messageBody.user,
            timestamp: timestamp,
        });
    };

    return { messages, sendMessage };
};

export default useChat;