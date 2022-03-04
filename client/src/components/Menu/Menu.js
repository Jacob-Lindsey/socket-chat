import { IoClose } from "react-icons/io5";
import styles from "./Menu.module.css";

const Menu = (props) => {

    const setMenuOpen = props.setMenuOpen;
    const setPassword = props.setPassword;
    const room = props.room;
    const userList = props.userList;

    return (
        <section className={styles.menuContainer}>
            <div className={styles.menuInnerContainer}>
                <IoClose 
                    className={styles.menuClose}
                    aria-label="Close Menu"
                    onClick={() => setMenuOpen(false)}
                />
                <div className={`${styles.userListContainer} ${styles.isMobile}`}>
                    <h1 className={styles.hashMark}>#{room}</h1>
                    <strong>USERS</strong>
                    <div className={`${styles.userList} ${styles.isMobile}`}>
                        {userList}
                    </div>
                </div>
                ROOM SETTINGS
                <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Set Password"
                    className={styles.settingsInputField}
                    autoComplete="off"
                />
            </div>
        </section>
    )
};

export default Menu;