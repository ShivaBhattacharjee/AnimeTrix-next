import { connect } from "@/database/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        } else if (user.isVerified == false) {
            return NextResponse.json(
                {
                    error: "User is not verified",
                },
                {
                    status: 400,
                },
            );
        }
        user.passsword = token;
        user.forgotPasswordToken = undefined;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
