import { PasswordSettingsForm } from "@/components/profile/password-settings.tsx";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileSettingsForm } from '@/components/profile/profile-settings';
import { SessionProvider } from "next-auth/react";

const Account = () => {
    return (
        <SessionProvider>
        <div className="min-w-full rounded-2xl py-20 px-10">
            <div className="flex flex-col lg:space-x-10 space-y-10 lg:space-y-0 sm:space-y-10 lg:flex-row justify-center items-center lg:items-start">
                <div className="w-1/2">
                    <ProfileCard />
                </div>
                <div className="flex flex-col w-full space-y-3">
                    <div className="w-full">
                        <ProfileSettingsForm />
                    </div>
                    <div className="w-full">
                        <PasswordSettingsForm />
                    </div>
                </div>
            </div>
        </div>
        </SessionProvider>
    );
};

export default Account;
