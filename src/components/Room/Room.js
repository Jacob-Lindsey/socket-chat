import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import useChat from "../../hooks/useChat";
import styles from "./Room.module.css";

const Room = (props) => {
    
    const { roomId  } = useParams();
    const location = useLocation();
    const state = location.state;
    const INITIAL_MESSAGE = {text: "", user: state.username};
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = useState(INITIAL_MESSAGE);


    const handleNewMessageChange = (e) => {
        let updatedMessage = {...newMessage};
        updatedMessage.text = e.target.value;
        setNewMessage(updatedMessage);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage(INITIAL_MESSAGE);
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
            <h1 className={styles.roomName}><span className={styles.hashMark}>#</span> {roomId}</h1>
            <section className={styles.messagesContainer}>
                <ol className={styles.messagesList}>
                    {messages.map((message, index) => (
                        <li 
                            key={index}
                            className={`${styles.messageItem} ${message.ownedByCurrentUser ? styles.myMessage : styles.recievedMessage}`}>
                            <p className={styles.messageText}>
                                {message.body}
                            </p>
                            <span className={styles.messageDetails}>
                                <small className={styles.messageSender}>{message.username}</small>
                                <small className={styles.messageTimestamp}>{message.timestamp}</small>
                            </span>
                            
                        </li>
                    ))}
                </ol>
            </section>
            <footer className={styles.footer}>
                <div className={styles.messageInputContainer}>
                    <input
                        type="text"
                        value={newMessage.text}
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