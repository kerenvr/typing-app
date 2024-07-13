import Link from "next/link";
import styles from "./navbar.module.css";
import Links from "./link/Links";
import { LuFlower } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { auth, signOut } from "@/auth";

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
import Image from "next/image";

const NavBar = async () => {
    const session = await auth();

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                {/* <Image src="Logo.svg" alt="flower logo" height={50} width={50}  /> */}
                <h1 className="text-sm text-indigo-500 font-bold">bloomtype</h1>
            </div>
            <div className="flex justify-center items-center space-x-2">
                <Links />

                {session && session.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-8 h-8 outline-2 select-none">
                                <AvatarImage src={session?.user.image ?? ""} />
                                <AvatarFallback className="outline-2">
                                    <LuUser className="w-28 h-28" />
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/account">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <form
                                    className="flex justify-center"
                                    action={async () => {
                                        "use server";
                                        await signOut();
                                    }}
                                >
                                    <button type="submit">Sign Out</button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};

export default NavBar;