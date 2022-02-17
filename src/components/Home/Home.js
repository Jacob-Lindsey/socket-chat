import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRoom } from "../../utils/Rooms";
import createRandomRoomName from "../../utils/createRandomRoomName";
import createRandomUsername from "../../utils/createRandomUsername";
import styles from "./Home.module.css";

const Home = () => {

    const [roomName, setRoomName] = useState('');
    const [username, setUsername] = useState('');

    let navigate = useNavigate();

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEnterKeySubmit = (e) => {
        if (e.key === 'Enter' && roomName !== '') {
            let usernameToSend = username !== '' ? username : createRandomUsername();
            navigate(`/${roomName !== '' ? roomName : createRandomRoomName()}`, {state: { username: usernameToSend }});
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
                <Link to={`/${roomName !== '' ? roomName : createRandomRoomName()}`} state={{ username: username !== '' ? username : createRandomUsername() }} className={styles.enterRoomButton}>
                    Join room
                </Link>
            </section>
        </main>
    );

};

export default Home;