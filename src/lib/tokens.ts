import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../../data/verification-token";
import { getPasswordResetTokenByEmail } from "../../data/password-reset-token";
import { prisma } from "./db";

// export const generatePasswordChangeToken= async (email: string) => {
//     const token = uuidv4();
//     const expires = new Date(new Date().getTime() + 3600 * 1000);

//     const existingToken = await getPasswordResetTokenByEmail(email);

//     if (existingToken) {
//         await prisma.passwordResetToken.delete({
//             where: {
//                 id: existingToken.id,
//             }
//         })
//     }
//         try {
//             const passwordChangeToken= await prisma.passwordChangeToken.create({
//                 data: {
//                     email,
//                     token,
//                     expires,
//                 }
//             });
//             return passwordChangeToken;

//         } catch (error) {
//             console.error('Error creating verification token:', error);
//             return null;
//         }

// }

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }
        try {
            const passwordResetToken = await prisma.passwordResetToken.create({
                data: {
                    email,
                    token,
                    expires,
                }
            });
            return passwordResetToken;

        } catch (error) {
            console.error('Error creating verification token:', error);
            return null;
        }

}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }
        try {
            const verificationToken = await prisma.verificationToken.create({
                data: {
                    email,
                    token,
                    expires,
                }
            });
            return verificationToken;

        } catch (error) {
            console.error('Error creating verification token:', error);
            return null;
        }

}