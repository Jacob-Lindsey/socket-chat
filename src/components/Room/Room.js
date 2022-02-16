import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
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

    const handleEnterKeySubmit = (e) => {
        if (e.key === 'Enter' && newMessage !== '') {
            e.preventDefault();
            e.stopPropagation();
            handleSendMessage();
        }
    };

    return (
        <main className={styles.roomContainer}>
            <h1 className={styles.roomName}># {roomId}</h1>
            <section className={styles.messagesContainer}>
                <ol className={styles.messagesList}>
                    {messages.map((message, index) => (
                        <li 
                            key={index}
                            className={`${styles.messageItem} ${message.ownedByCurrentUser ? styles.myMessage : styles.recievedMessage}`}>
                            <p className={styles.messageText}>
                                {message.body}
                            </p>
                            <small className={styles.messageSender}>{message.senderId}</small>
                        </li>
                    ))}
                </ol>
            </section>
            <footer className={styles.footer}>
                <div className={styles.messageInputContainer}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        onKeyDown={(e) => handleEnterKeySubmit(e)}
                        placeholder="Write message..."
                        className={styles.messageInputField}
                    />
                    {newMessage !== '' ? 
                        <button
                        onClick={handleSendMessage} 
                        className={styles.sendMessageButton}
                        >
                            <AiOutlineSend />
                        </button>
                            :
                        null
                    }
                    
                </div>
            </footer>
        </main>
    )

};

export default Room;