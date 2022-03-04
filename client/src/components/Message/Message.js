import styles from "./Message.module.css";

const Message = (props) => {

    const index = props.index;
    const message = props.message;
    const name = props.name;
    
    return (
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
    )
};

export default Message;