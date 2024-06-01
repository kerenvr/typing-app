import { SquareCheck } from 'lucide-react';

interface FormSuccessProps {
    message? : string;
}

export const FormSuccess = ({
   message,
}: FormSuccessProps) => {
    if (!message) return null;

    return (
        <span className="bg-emerald-50 p-3 rounded-md flex  items-center text-sm text-emerald-400 font-semibold">
            <SquareCheck className="mr-2" size={16} />
            <p>{message}</p>
        </span>
    )
    

}