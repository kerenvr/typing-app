import { TriangleAlert } from 'lucide-react';

interface FormErrorProps {
    message? : string;
}

export const FormError = ({
   message,
}: FormErrorProps) => {
    if (!message) return null;

    return (
        <span className="bg-destructive/10 p-3 rounded-md flex items-center text-sm text-destructive">
            <TriangleAlert className="mr-2" size={16} />
            <p>{message}</p>
        </span>
    )
    

}