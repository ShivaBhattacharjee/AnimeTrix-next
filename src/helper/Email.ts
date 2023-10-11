import nodemailer from "nodemailer";
import User from "@/model/user.model";
import bcryptjs from "bcryptjs";
type EmailProps = {
    email: string;
    emailType: string;
    userId: string;
};
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType == "VERIFY_USER") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3 * 60 * 60 * 1000 }); //token expiry is 3 hours
        } else if (emailType == "RESET_PASSWORD_USER") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3 * 60 * 60 * 1000 }); //token expiry in 3 hours
        }

        const transport = nodemailer.createTransport({
            service: process.env.NEXT_PUBLIC_EMAIL_SERVICE,
            auth: {
                user: process.env.NEXT_PUBLIC_USER,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: "animetrixverify@gmail.com",
            to: email,
            subject: emailType === "VERIFY_USER" ? "Verify your email" : "Use a password manager lol dont use forget password every now and then",
            html: `<p> Hey ${email} <br/>
            <h1>Welcome to animeTrix</h1>
            Click Here to verify your account</p>
            <br/>
            <a href = "http://localhost:3000/${emailType == "VERIFY_USER" ? "verifyToken" : "resetPassword"}?token=${hashedToken}" >
            <button>${emailType === "VERIFY_USER" ? "Verify" : " Reset"}</button>
            </a>`,
        };
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
