import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { sendEmail } from "@/helper/Email";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

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
        return NextResponse.json({ message: "Reset Password Email Sent.", success: true });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500 });
    }
}
