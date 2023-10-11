import { connect } from "@/database/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // check if user exists in db
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist", success: false }, { status: 400 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ error: "User is not verified", success: false }, { status: 400 });
            console.log("user verification status: " + user.isVerified);
        }

        // check if password is correct

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password", success: false }, { status: 400 });
        }
        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_TOKEN!, { expiresIn: "2y" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token);
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
