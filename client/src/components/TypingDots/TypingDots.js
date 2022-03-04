import styles from "./TypingDots.module.css";

const TypingDots = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    )
};

export default TypingDots;