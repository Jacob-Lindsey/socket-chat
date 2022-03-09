import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai"
import HomeHeader from "../HomeHeader/HomeHeader";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import styles from "./Home.module.css";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [persistent, setPersistent] = useState(false);

  return (
    <>
      <HomeHeader />
      <main className={styles.container}>
        
        <section className={styles.roomNameInput}>
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
          <span className={styles.optionsWrapper}>
            <Link
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}&per=${persistent}`}
            >
              <button type="submit" className={styles.enterRoomButton}>
                Join room
              </button>
            </Link>
            <div className={styles.options}>
              <label>
                <span>
                  Persist Messages?
                  <AiOutlineInfoCircle 
                    className={styles.info}
                  />
                  <span className={styles.tooltip}>
                    Rooms with persistent messages enabled will be preserved for future visits. Leave this setting disabled if you wish your conversations to disappear when you are done.
                    <span className={styles.tooltipFooter}>(Only applies to newly created rooms)</span>
                  </span>
                </span>
                <ToggleSwitch 
                  persistent={persistent}
                  setPersistent={setPersistent}
                />
              </label>
            </div>
          </span>
        </section>
        
      </main>
    </>
  );
};

export default Home;
