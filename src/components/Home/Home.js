import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {

    const [roomName, setRoomName] = useState('');

    let navigate = useNavigate();

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleEnterKeySubmit = (e) => {
        if (e.key === 'Enter' && roomName !== '') {
            navigate(`/${roomName}`);
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
                <Link to={`/${roomName}`} className={styles.enterRoomButton}>
                    Join room
                </Link>
            </section>
        </main>
    );

};

export default Home;