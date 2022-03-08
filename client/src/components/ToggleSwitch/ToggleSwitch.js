import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ persistent, setPersistent }) => {

    return (
        <>
            <input
                checked={persistent}
                onChange={() => setPersistent(!persistent)}
                className={styles.toggleCheckbox}
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                style={{ background: persistent && '#06D6A0' }}
                className={styles.toggleCheckboxLabel}
                htmlFor={`react-switch-new`}
            >
                <span className={styles.toggleHandle} />
            </label>
        </>
        
    )

};

export default ToggleSwitch;
