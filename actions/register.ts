"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const Register = async  (values: z.infer<typeof RegisterSchema>) => {
    const result = RegisterSchema.safeParse(values);

    if (!result.success) {
        return { error: result.error.message };
    }

    return { success: "Success!" };
}