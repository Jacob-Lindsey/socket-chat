import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";


const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <main className={styles.container}>
      <section className={styles.roomNameInput}>
        <header className={styles.sectionHeader}></header>
        <input
          placeholder="Room Name"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
          className={styles.inputField}
          required
        />
        <input
          placeholder="Username"
          type="text"
          onChange={(event) => setName(event.target.value)}
          className={styles.inputField}
          required
        />
        
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit" className={styles.enterRoomButton}>
            Join room
          </button>
        </Link>
      </section>
      <div className={styles.options}>
      </div>
    </main>
  );
};

export default Home;
