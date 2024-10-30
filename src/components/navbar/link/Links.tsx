"use client";

import { useState, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { debounce } from 'lodash';
import { useUser } from "@clerk/nextjs"; 



const Links = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser(); // Get the user information
    const links =[
        {
            title: "Typing",
            path: "/typing",
        },
            ...(user ? [{ title: "Stats", path: "/stats" }] : []), // Only include if user is logged in
    

    ];


    useEffect(() => {
        const handleResize = () => {
                if (window.innerWidth > 768) {
                setOpen(false)
            } 
        };

        window.addEventListener('resize', debounce(handleResize));

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', debounce(handleResize));
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.links}> 
                {links.map((link => (
                    <NavLink item = {link} key ={link.title} />
                )))}
            </div>
            <Image 
                className={styles.menuBtn}
                src="/menu.png"
                alt=""
                width={30}
                height={30}
                onClick={() => setOpen((prev) => !prev)}
            />
      {open && (
        <div className={styles.activeContainer}>
            <div className={styles.active}>
            {links.map((link) => (
                <NavLink item={link} key={link.title} />
            ))}
            </div>
        </div>
      )}
        </div>
    )
}

export default Links;