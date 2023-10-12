import { connect } from "@/database/db";
import { sendEmail } from "@/helper/Email";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;

        const user = await User.findOne({ email: email });
        if (!user) return NextResponse.json({ error: "No user found" }, { status: 400 });

        await sendEmail({
            email,
            emailType: "RESET_PASSWORD_USER",
            userId: user._id,
        });
        return NextResponse.json({ message: "Email sent. Please verify your registration.", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
