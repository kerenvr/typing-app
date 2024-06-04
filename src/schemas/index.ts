import * as z from "zod";


export const LoginSchema = z.object({
    username: z.string({
        message: "A username must be provided.",
    }),
    password: z.string().min(6, {
        message: "A password must be provided.",
    }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "A name must be provided.",
    }),
    email: z.string().min(6, {
        message: "An email must be provided.",
    }),
    username: z.string({
        message: "A username must be provided.",
    }),
    password: z.string().min(6, {
        message: "A password must be provided.",
    }),
});
