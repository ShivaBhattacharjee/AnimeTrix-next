import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);

        if (Date.now() > user.verifyTokenExpiry) {
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        } else {
            user.isVerified = true;
        }
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500 });
    }
}
