import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        if (user.isVerified == false) {
            return NextResponse.json(
                {
                    error: "User is not verified",
                },
                {
                    status: 400,
                },
            );
        }
        if (Date.now() > user.forgotPasswordTokenExpiry) {
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Password Reset successfull",
            success: true,
        });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500 });
    }
}
