import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileSettingsForm } from '@/components/profile/profile-settings';

const Account = () => {
    return (
        <div className="min-w-full rounded-2xl py-20 px-2">
            <div className="flex flex-col lg:space-x-10 space-y-10 lg:space-y-0 sm:space-y-10 lg:flex-row justify-center items-center lg:items-start">
                <div className="w-full">
                    <ProfileCard />
                </div>
                <div className="w-full">
                    <ProfileSettingsForm />
                </div>
            </div>
        </div>
    );
};

export default Account;
