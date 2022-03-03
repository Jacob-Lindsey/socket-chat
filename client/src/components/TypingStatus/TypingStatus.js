import styles from "./TypingStatus.module.css";

const TypingStatus = (typingMessage) => {
    return (
        <span className={styles.wrapper}>{typingMessage}</span>
    )
};

export default TypingStatus;