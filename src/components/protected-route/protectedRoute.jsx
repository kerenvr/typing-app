import { RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const ProtectedRoute = ({ children }) => {
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <RedirectToSignIn />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
