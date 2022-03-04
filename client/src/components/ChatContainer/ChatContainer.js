import Message from "../Message/Message";
import styles from "./ChatContainer.module.css";

const ChatContainer = (props) => {

    const messages = props.messages;
    const messagesEndRef = props.messagesEndRef;
    const name = props.name;
    const userList = props.userList;

    return (
        <section className={styles.chatContainer}>
            <ol className={styles.messagesList}>
                {messages.map((message, index) => (
                    <Message 
                        index={index}
                        message={message}
                        name={name}
                    />
                ))}
                <div className={styles.messagesEnd} ref={messagesEndRef} />
            </ol>
            <div className={`${styles.userList} ${styles.isDesktop}`}>
                {userList}
            </div>
        </section>
    )
};

export default ChatContainer;