"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const Reset = async (values: z.infer<typeof ResetSchema>) => {
    const validFields = ResetSchema.safeParse(values);

    if (!validFields.success) {
        return { error: "Invalid email!" };
    }

    const { email } = validFields.data;

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) {
        return { error: "Error generating password reset token." };
    }

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );

    return { success: "If the email address you provided is registered, you will receive password reset instructions shortly." };
} 