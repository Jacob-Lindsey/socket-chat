import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";


const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState(null);

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
          state={{ 
            hasPassword: hasPassword,
            password: password,
          }}
        >
          <button type="submit" className={styles.enterRoomButton}>
            Join room
          </button>
        </Link>
      </section>
      <div className={styles.options}>
        <label className={styles.passwordLabel}>
          <input 
            type="checkbox"
            name="hasPassword"
            value="Require Password?"
            onChange={() => setHasPassword(!hasPassword)}
            className={styles.passwordCheckbox}
          />
          Require Password?
        </label>
        { hasPassword ?
          <input 
            type="password"
            name="password"
            placeholder="Room Password"
            onChange={(event) => setPassword(event.target.value)}
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
