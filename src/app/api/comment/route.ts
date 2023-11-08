import { NextRequest, NextResponse } from "next/server";
import Comment from "@/model/comment.model";
import { connect } from "@/database/db";
import { Error } from "@/types/ErrorTypes";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
connect();

export async function POST(request: NextRequest) {
    try {
        const userID = getDataFromJwt(request);
        const reqBody = await request.json();
        const { animeId, text, userId } = reqBody;
        const user = await User.findOne({ _id: userID }).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    error: "No user found",
                },
                {
                    status: 401,
                },
            );
        }
        const newComment = new Comment({
            userId,
            animeId,
            text,
        });
        await newComment.save();
        return NextResponse.json({
            message: "Comment added",
        });
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return NextResponse.json({ error: ErrorMsg.message });
    }
}
