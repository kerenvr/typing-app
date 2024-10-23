import Link from "next/link";
import styles from "./navbar.module.css";
import Links from "./link/Links";
import { LuFlower } from "react-icons/lu";
import { LuUser } from "react-icons/lu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = async () => {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <LuFlower className="w-10 h-10" />
            </div>
            <div className="flex justify-center items-center space-x-2">
                <Links />
            </div>
        </div>
    );
};

export default NavBar;