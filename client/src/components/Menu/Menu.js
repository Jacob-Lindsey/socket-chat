import Switch from "react-switch";
import { IoClose } from "react-icons/io5";
import { updateRoom } from "../../helpers/updateRoom";
import styles from "./Menu.module.css";

const Menu = (props) => {

    const setMenuOpen = props.setMenuOpen;
    const hasPassword = props.hasPassword;
    const setHasPassword = props.setHasPassword;
    const password = props.password;
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
                    <p className={styles.hashMark}>#{room}</p>
                    <p className={styles.settingsTitle}>USERS</p>
                    <div className={`${styles.userList} ${styles.isMobile}`}>
                        {userList}
                    </div>
                </div>
                <p className={styles.settingsTitle}>ROOM SETTINGS</p>
                <div className={`${styles.menuSection} ${styles.passwordSection}`}>
                    <label>
                        <span>Password Protect Room?</span>
                        <Switch 
                            onChange={() => setHasPassword(!hasPassword)}
                            checked={hasPassword}
                        />
                    </label>
                    <div className={hasPassword ? styles.passwordContainer : styles.hidden}>
                        <input
                            type="text"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Set Password"
                            className={styles.settingsInputField}
                            autoComplete="off"
                        />
                        <div className={styles.passwordButtons}>
                            <button 
                                className={styles.saveButton}
                                onClick={() => updateRoom(hasPassword, password)}
                            >
                                SAVE CHANGES
                            </button>
                            <button className={styles.cancelButton}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Menu;