import { auth } from '@/auth';

const Account = async () => {
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
        </div>
    )
}

export default Account;