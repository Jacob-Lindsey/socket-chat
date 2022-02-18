import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { BsPersonBadge } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { MdNavigateBefore } from 'react-icons/md';
import useChat from "../../hooks/useChat";
import styles from "./Room.module.css";

const Room = (props) => {
    
    const { roomId  } = useParams();
    const location = useLocation();
    const state = location.state;
    const INITIAL_MESSAGE = {text: "", user: state.username};
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = useState(INITIAL_MESSAGE);

    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate(-1)
    };

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
        <main aria-label="Chat Room" className={styles.roomContainer}>
            <header aria-label={roomId} className={styles.header}>
                <MdNavigateBefore
                    style={{ cursor: "pointer", fontSize: "1.6rem" }}
                    aria-label="Navigate Back"
                    onClick={(e) => handleNavigate(e)} 
                />
                <h1 className={styles.roomName}>
                    <div>
                        <span className={styles.hashMark}>#</span>
                        {roomId}
                        <HiLockClosed 
                            style={{ color: "hsla(137, 100%, 39%, 1)",  fontSize: "1.3rem", margin: "0 0.5rem" }}
                            aria-label="Room Is Password Protected"
                        />
                    </div>
                    <small className={styles.username}>
                        <BsPersonBadge style={{ fontSize: "0.8rem" }} />
                        {state.username}
                    </small>
                </h1>
            </header>
            
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
            <footer aria-label="Chat Room Input" className={styles.footer}>
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