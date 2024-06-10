import { LuUser } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signOut } from '@/auth';
export const ProfileCard = async () => {
    const session = await auth();
    const token = await auth();

    return (
        <>
        <div className="bg-white rounded-[30px] space-y-10 px-16 py-8 shadow-2xl">
            <div className="flex flex-col justify-center items-center px-5 space-y-4">
                {session && session.user && (
                <>
                    <Avatar className="w-28 h-28 outline-2">
                        <AvatarImage src={session?.user.image ?? ''} />
                        <AvatarFallback className="outline-2">
                            <LuUser className="w-28 h-28"/>
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="text-2xl font-semibold pb-3">{session.user.name}</h1>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-xs ">{session.user.email}</p>
                            <p className="text-xs ">{session.user.username}</p>
                        </div>

                    </div>
                </>
                )}
            </div>

            <form className="flex justify-center"
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button className="ring-1 ring-[#E8E8E8] p-2 rounded-full text-xs w-full" type="submit">Sign Out</button>
            </form>
        </div>
        </>
    );
}