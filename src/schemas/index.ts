import * as z from "zod";

export const wpmSchema = z.object({
    wpm: z.number().max(3)
});

export const UpdatePasswordSchema = z.object({
    currPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    }),
    newPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    }),
    repeatNewPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    }),
});

export const UpdateProfileSchema = z.object({
    name: z.optional(z.string()),
    username: z.optional(z.string()),
    email: z.optional(z.string()),
});

export const ResetSchema = z.object({
    email: z.string().min(1, {
        message: "An email must be provided.",
    }),
});

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "A username must be provided.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "A name must be provided.",
    }),
    email: z.string().min(1, {
        message: "An email must be provided.",
    }),
    username: z.string({
        message: "A username must be provided.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    }),
});

export const ThreeCharNumberSchema = z.number().min(100).max(999);