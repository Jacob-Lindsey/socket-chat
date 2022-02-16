import { IconContext } from 'react-icons/lib';
import { MdNavigateBefore } from 'react-icons/md';
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <IconContext.Provider value={{ size: "1.6rem", style: { cursor: "pointer" }, title: "Navigate Back" }}>
            <div className={styles.container}>
                <MdNavigateBefore />
            </div>
        </IconContext.Provider>
    )
};

export default Nav;