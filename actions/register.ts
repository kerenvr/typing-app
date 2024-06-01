"use server"

import { FormSchema } from "@/app/auth/register/form";
import { FormData } from "@/app/auth/register/form";

export const Register = async  (values: FormData) => {
    try {
        const validatedFields = FormSchema.parse(values);
        return { success: "Success!" };
    } catch (error) {
        return { error: "Something went wrong." };
    }
}