import { MdNavigateBefore } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { IoAlertCircleOutline, IoSettingsSharp } from "react-icons/io5";
import styles from "./RoomHeader.module.css";

const RoomHeader = (props) => {

    const handleNavigate = props.handleNavigate;
    const setMenuOpen = props.setMenuOpen;
    const menuOpen = props.menuOpen;
    const room = props.room;
    const persistent = props.persistent;
    const hasPassword = props.hasPassword;

    return (
        <header aria-label={room} className={styles.header}>
            <MdNavigateBefore
                aria-label="Navigate Back"
                className={styles.backArrow}
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
                                aria-label="Room is password protected"
                            />
                        :
                        null
                    }
                    {
                        persistent ?
                            <>
                                <IoAlertCircleOutline 
                                    style={{ color: "hsl(137, 53%, 44%)",  fontSize: "1.3rem", margin: "0 0.4rem 0 1.5rem" }}
                                    aria-label="Conversations in this room will be saved for future visits"
                                />
                                <span className={styles.roomStatus}>Chat logging enabled</span>
                            </>
                        :
                        null
                    }
                </div>
                <span className={styles.settings} onClick={() => setMenuOpen(!menuOpen)}>
                    <IoSettingsSharp
                        aria-expanded={menuOpen}
                        aria-label="Toggle menu"
                        className={styles.settingsIcon}
                        style={{ fontSize: "0.8rem" }} 
                    />
                </span>
            </h1>
        </header>
    )
};

export default RoomHeader;