"use client";

import { CardWrapper } from "./card-wrapper";
import { PulseLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState} from "react";
import { NewVerification } from "../../../data/new-verification";

import { FormError} from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";



export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!");
            return;
        };
        
        NewVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
        })
            .catch(() => {
                setError("An error occurred!");
            })
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);


    return (

    <>
        <CardWrapper
         headerLabel="Hold on while we confirm your verification."
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
         width="w-[400px]"
         >
            <div className="flex items-center w-full justify-center">
                {!success && !error &&(
                <PulseLoader color="#000" size="8px"/>
                )
                }
                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
           
        </CardWrapper>
        
    </>
    )
}
