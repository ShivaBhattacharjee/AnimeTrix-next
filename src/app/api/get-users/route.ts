import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const searchUser = searchParams.get("userId");

        let userId: number | string;

        if (searchUser) {
            userId = searchUser;
        } else {
            userId = getDataFromJwt(request);
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json(
                {
                    error: "Invalid userId format",
                },
                {
                    status: 400,
                },
            );
        }

        const user = await User.findOne({ _id: userId }).select("-password -watchHistory -bookmarks -isAdmin");

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                },
            );
        }
        return NextResponse.json({
            message: "User found",
            userData: user,
        });
    } catch (error: unknown) {
        const err = error as Error;
        return NextResponse.json(
            {
                error: err.message,
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
