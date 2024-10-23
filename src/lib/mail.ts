import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `https://bloomtypes.com/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verification email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `https://bloomtypes.com/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to rest your password.</p>`
    })
}