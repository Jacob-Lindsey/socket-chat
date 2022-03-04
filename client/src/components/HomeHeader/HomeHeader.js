import styles from "./HomeHeader.module.css";

const HomeHeader = () => {

    return (
        <header className={styles.sectionHeader}>
            <a className={styles.logoWrapper} href="/">
                <p className={styles.logo}>SC</p>
            </a>
        </header>
    )

};

export default HomeHeader;