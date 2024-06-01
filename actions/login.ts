"use server"

import { FormSchema } from "@/app/auth/login/form";
import { FormData } from "@/app/auth/login/form";

export const Login = async  (values: FormData) => {
    try {
        const validatedFields = FormSchema.parse(values);
        return { success: "Success!" };
    } catch (error) {
        return { error: "Your username or password is incorrect." };
    }
};