import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {

    const [roomName, setRoomName] = useState('');

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    return (
        <div className={styles.container}>
            <input 
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={handleRoomNameChange}
                className={styles.inputField}
            />
            <Link to={`/${roomName}`} className={styles.enterRoomButton}>
                Join room
            </Link>
        </div>
    );

};

export default Home;