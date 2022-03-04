import { MdNavigateBefore } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import styles from "./RoomHeader.module.css";

const RoomHeader = (props) => {

    const handleNavigate = props.handleNavigate;
    const setMenuOpen = props.setMenuOpen;
    const menuOpen = props.menuOpen;
    const room = props.room;
    const hasPassword = props.hasPassword;

    return (
        <header aria-label={room} className={styles.header}>
            <MdNavigateBefore
                style={{ cursor: "pointer", fontSize: "1.6rem" }}
                aria-label="Navigate Back"
                onClick={() => handleNavigate()} 
            />
            <h1 className={styles.roomName}>
                <div>
                    <span className={styles.hashMark}>#</span>
                    {room}
                    {
                        hasPassword ?
                            <HiLockClosed 
                                style={{ color: "hsla(137, 100%, 39%, 1)",  fontSize: "1.3rem", margin: "0 0.5rem" }}
                                aria-label="Room Is Password Protected"
                            />
                        :
                        null
                    }
                </div>
                <span className={styles.settings} onClick={() => setMenuOpen(!menuOpen)}>
                    <IoSettingsSharp style={{ fontSize: "0.8rem" }} />
                </span>
            </h1>
        </header>
    )
};

export default RoomHeader;