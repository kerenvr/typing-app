"use client"
import styles from './navLink.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    item: {
        path: string;
        title: string;
    };
}

const NavLink = ({ item }: NavLinkProps) => {
    const pathName = usePathname() 
    return (
        <Link className={`${styles.container} ${pathName === item.path && styles.active}`} href={item.path}>{item.title}</Link>
    )
    
}

export default NavLink;