import Link from "next/link"
import styles from "./navbar.module.css"
import Links from "./link/Links"
import { LuFlower } from "react-icons/lu";

const NavBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
            <LuFlower className="w-10 h-10"/>
            </div>
            <div>
                <Links />
            </div>
        </div>
    )
};

export default NavBar;