import { useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "../../hooks/useChat";
import styles from "./Room.module.css";

const Room = (props) => {

    const { roomId  } = useParams();
    const {  messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <div className={styles.roomContainer}>
            <h1 className={styles.roomName}>Room: {roomId}</h1>
            <div className={styles.messagesContainer}>
                <ol className={styles.messagesList}>
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={`${styles.messageItem} ${message.ownedByCurrentUser ? styles.myMessage : styles.recievedMessage}`}
                        >
                            {message.body}
                        </li>
                    ))}
                </ol>
            </div>
            <div className={styles.messageInputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className={styles.messageInputField}
                />
                <button
                    onClick={handleSendMessage} className={styles.sendMessageButton}
                >
                    Send
                </button>
            </div>
        </div>
    )

};

export default Room;