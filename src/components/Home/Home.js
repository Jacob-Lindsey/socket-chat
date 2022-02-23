import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createRoom } from "../../utils/Rooms";
import createRandomRoomName from "../../utils/createRandomRoomName";
import createRandomUsername from "../../utils/createRandomUsername";
import styles from "./Home.module.css";

const Home = () => {

    const [roomName, setRoomName] = useState('');
    const [username, setUsername] = useState('');
    const [hasPassword, setHasPassword] = useState(false);
    const [isPersistent, setIsPersistent] = useState(true);
    const [password, setPassword] = useState(null);

    let navigate = useNavigate();

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEnablePasswordChange = () => {
        setHasPassword(!hasPassword);
    };

    const handlePasswordChange = (e) => {
        if (e.target.value === "") {
            setPassword(null);
        } else {
            setPassword(e.target.value);   
        }
    };

    const handleEnterKeySubmit = (e) => {
        if (e.key === 'Enter' && roomName !== '') {
            let usernameToSend = username !== '' ? username : createRandomUsername();
            navigate(
                `/${roomName !== '' ? roomName : createRandomRoomName()}`,
                {state:
                    { 
                        username: usernameToSend,
                        hasPassword: hasPassword,
                        password: password,
                        isPersistent: isPersistent,
                    }
            });
        }
    };

    return (
        <main className={styles.container}>
            <section className={styles.roomNameInput}>
                <input 
                    type="text"
                    placeholder="Join Room"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    onKeyPress={handleEnterKeySubmit}
                    className={styles.inputField}
                />
                <input 
                    type="text"
                    placeholder="Username (optional)"
                    value={username}
                    onChange={handleUsernameChange}
                    onKeyPress={handleEnterKeySubmit}
                    className={styles.inputField}
                />
                <Link 
                    to={`/${roomName !== '' ? roomName : createRandomRoomName()}`} 
                    state={{ 
                        username: username !== '' ? username : createRandomUsername(),
                        hasPassword: hasPassword,
                        password: password,
                        isPersistent: isPersistent,
                    }} 
                    className={styles.enterRoomButton}
                >
                    Join room
                </Link>
            </section>
            <div className={styles.options}>
                <label className={styles.passwordLabel}>
                    <input 
                        type="checkbox"
                        name="hasPassword" 
                        value="Require Password?"
                        onChange={handleEnablePasswordChange}
                        className={styles.passwordCheckbox}
                    />
                    Require Password?
                </label>
                { hasPassword ? 
                    <input 
                        type="password"
                        name="password"
                        placeholder="Room password"
                        onChange={handlePasswordChange}
                        className={styles.inputField}
                    />
                    :
                    null
                }
            </div>
                

            
        </main>
    );

};

export default Home;