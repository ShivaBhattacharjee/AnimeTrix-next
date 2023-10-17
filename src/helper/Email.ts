import nodemailer from "nodemailer";
import User from "@/model/user.model";
import bcryptjs from "bcryptjs";
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
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: cleanedHashedToken }); //token expiry in 3 hours
        }

        const transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "gust84@ethereal.email",
                pass: "VEv7WYgbDEbDHmcQQd",
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
            <h1>Alternatively you can also paste this link in browser</h1>
            </br>
            ${process.env.NEXT_PUBLIC_DOMAIN}/${emailType == "VERIFY_USER" ? "verifyToken" : "verifyResetPassword"}?token=${cleanedHashedToken}
            <br/>
            <a href = "${process.env.NEXT_PUBLIC_DOMAIN}/${emailType == "VERIFY_USER" ? "verifyToken" : "verifyResetPassword"}?token=${cleanedHashedToken}" target="_blank" >
            <button style={}>${emailType === "VERIFY_USER" ? "Verify" : " Reset"}</button>
            </a>`,
        };
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
