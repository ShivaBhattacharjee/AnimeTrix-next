import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password -watchHistory -bookmarks -isAdmin");
        return NextResponse.json({
            message: "User found",
            userData: user,
        });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json(
            {
                error: Error.message,
            },
            {
                status: 400,
            },
        );
    }
}
export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userId = getDataFromJwt(request);
        const { username, profilePicture, userDescription } = reqBody;
        const user = await User.findOne({ _id: userId }).select("-password -watchHistory -bookmarks -isAdmin");
        if (!user) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 400,
                },
            );
        }
        if (username) {
            user.username = username;
        }
        if (profilePicture) {
            user.profilePicture = profilePicture;
        }
        if (userDescription) {
            user.userDescription = userDescription;
        }
        await user.save();
        return NextResponse.json(
            {
                message: "User updated",
                userData: user,
            },
            {
                status: 200,
            },
        );
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json(
            {
                error: Error.message,
            },
            {
                status: 400,
            },
        );
    }
}
