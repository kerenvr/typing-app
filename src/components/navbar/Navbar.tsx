import Link from "next/link"
import styles from "./navbar.module.css"
import Links from "./link/Links"
import { LuFlower } from "react-icons/lu";

const NavBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
            <p className="font-thin text-indigo-400">bloomtype</p>
            </div>
            <div>
                <Links />
            </div>
        </div>
    )
};

export default NavBar;