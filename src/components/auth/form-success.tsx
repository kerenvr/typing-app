import { TriangleAlert } from 'lucide-react';

interface FormSuccessProps {
    message? : string;
}

export const FormSuccess = ({
   message,
}: FormSuccessProps) => {
    if (!message) return null;

    return (
        <span className="bg-emerald-500 p-3 rounded-md flex items-center text-sm text-emerald-500">
            <TriangleAlert className="mr-2" size={16} />
            <p>{message}</p>
        </span>
    )
    

}