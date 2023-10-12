import { connect } from "@/database/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { forgotPasswordtoken, newPassword } = reqBody;
        const user = await User.findOne({ forgotPasswordToken: forgotPasswordtoken });

        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 });
        }

        if (Date.now() > user.verifyTokenExpiry) {
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
