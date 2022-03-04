import { AiOutlineSend } from "react-icons/ai";
import TypingDots from "../TypingDots/TypingDots";
import { handleEnterKeySubmit } from "../../helpers/handleEnterKeySubmit";
import { handleSubmit } from "../../helpers/handleSubmit";
import { handleTypingStatus } from "../../helpers/handleTypingStatus";
import styles from "./ChatInput.module.css";

const ChatInput = (props) => {

    const setMessage = props.setMessage;
    const socket = props.socket;
    const message = props.message;
    const typingMessage = props.typingMessage;

    return (
        <footer aria-label="Chat Room Input" className={styles.footer}>
            {typingMessage ? 
                <span className={styles.typingMessage}>
                    <TypingDots />
                    {typingMessage}
                </span> 
                : 
                null
            }
            <form 
                action=""
                className={styles.messageInputContainer}
                onSubmit={(e) => handleSubmit(e, socket, message, setMessage)}
            >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="chatInput"
                onKeyDown={(e) => handleEnterKeySubmit(e, socket, message, setMessage)}
                onKeyUp={(e) => handleTypingStatus(e, socket)}
                placeholder="Write message..."
                className={styles.messageInputField}
                autoComplete="off"
            />
            {message ? 
                <button
                    type="submit" 
                    className={styles.sendMessageButton}
                >
                    <AiOutlineSend />
                </button>
                    :
                null
            }
            </form>
        </footer>
    )
};

export default ChatInput;