import { SquareCheck } from 'lucide-react';

interface FormSuccessProps {
    message? : string;
    flexClass?: string;
}

export const FormSuccess = ({
   message,
   flexClass = "flex-row",
}: FormSuccessProps) => {
    if (!message) return null;

    return (
        <span className={`bg-emerald-50 p-3 rounded-md flex ${flexClass} items-center text-sm text-emerald-400 font-semibold`}>
            <SquareCheck className="mr-2" size={16} />
            <p>{message}</p>
        </span>
    )
    

}