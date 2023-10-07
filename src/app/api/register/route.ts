import { connect } from "@/database/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { AxiosError } from "axios";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return NextResponse.json({ error: "User already exists", success: false }, { status: 400 });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verification email

        return NextResponse.json({
            message: "Registration successful",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
