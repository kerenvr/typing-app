import { VerificationEmailTemplate } from "@/components/email/verification-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const heading = "Verify Your Email Account";
    const content = "You're almost ready to start typing. Now you just need to verify your email";
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verification email",
        text: content, 
        react: VerificationEmailTemplate({ confirmLink, heading, content }),
    });
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to rest your password.</p>`
    })
}