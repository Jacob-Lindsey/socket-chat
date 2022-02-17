import { useNavigate } from "react-router-dom";
import { IconContext } from 'react-icons/lib';
import { MdNavigateBefore } from 'react-icons/md';
import styles from './Nav.module.css';

const Nav = () => {

    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate(-1)
    };

    return (
        <IconContext.Provider value={{ size: "1.6rem", style: { cursor: "pointer" }, title: "Navigate Back" }}>
            <nav className={styles.container}>
                <MdNavigateBefore 
                    onClick={(e) => handleNavigate(e)}
                />
            </nav>
        </IconContext.Provider>
    )
};

export default Nav;