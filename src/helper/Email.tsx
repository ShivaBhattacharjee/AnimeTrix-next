import { render } from "@react-email/render";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

import User from "@/model/user.model";
import RegisterEmail from "@/utils/EmailTemplate/RegisterEmail";

type EmailProps = {
    email: string;
    emailType: string;
    userId: string;
};
export const sendEmail = async ({ email, emailType, userId }: EmailProps) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const cleanedHashedToken = hashedToken.replace(/\$|\.|\//g, ""); //to remove special characters
        if (emailType == "VERIFY_USER") {
            await User.findByIdAndUpdate(userId, { verifyToken: cleanedHashedToken, verifyTokenExpiry: Date.now() + 3 * 60 * 60 * 1000 }); //token expiry is 3 hours
        } else if (emailType == "RESET_PASSWORD_USER") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: cleanedHashedToken, forgotPasswordTokenExpiry: Date.now() + 3 * 60 * 60 * 1000 }); //token expiry in 3 hours
        }

        const transport = nodemailer.createTransport({
            service: process.env.NEXT_PUBLIC_EMAIL_SERVICE,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
            },
        });

        const registerEmail = render(<RegisterEmail username={email} type={emailType} VerifyLink={`${process.env.NEXT_PUBLIC_DOMAIN}/${emailType == "VERIFY_USER" ? "verifyToken" : "verifyResetPassword"}?token=${cleanedHashedToken}`} />);
        const mailOptions = {
            from: `${process.env.NEXT_PUBLIC_EMAIL!}`,
            to: email,
            subject: emailType === "VERIFY_USER" ? "Verify your email" : "Reset Your Password and Keep it a Secret! 🤐",
            html: registerEmail,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: unknown) {
        console.log("Error sending email", error);
    }
};
