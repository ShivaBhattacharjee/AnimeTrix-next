import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import Comment from "@/model/comment.model";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const userID = getDataFromJwt(request);
        const reqBody = await request.json();
        const { streamId, text } = reqBody;
        const user = await User.findOne({ _id: userID }).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    error: "No user found",
                },
                {
                    status: 404,
                },
            );
        }

        const newComment = new Comment({
            userId: userID,
            streamId,
            text,
        });

        await newComment.save();

        const existingComments = await Comment.find({ streamId }).sort({ timestamp: 1 }).lean();
        existingComments.unshift(newComment.toObject());

        return NextResponse.json({
            message: "Comment added",
        });
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return NextResponse.json({ error: ErrorMsg.message });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") ?? "1", 10);
        const anime = searchParams.get("streamId");
        const limit = 12;

        if (page < 1) {
            return NextResponse.json(
                {
                    error: "Invalid page number",
                },
                {
                    status: 400,
                },
            );
        }

        if (!anime) {
            return NextResponse.json(
                {
                    error: "Invalid streamId",
                },
                {
                    status: 400,
                },
            );
        }

        const skip = (page - 1) * limit;

        const comments = await Comment.find({ streamId: anime }).sort({ timestamp: "desc" }).skip(skip).limit(limit);

        const nextPage = comments.length === limit;
        const comment = {
            nextPage,
            comments,
        };

        return NextResponse.json({
            comment,
            page,
        });
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return NextResponse.json(
            {
                message: ErrorMsg.message,
            },
            {
                status: 500,
            },
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userID = getDataFromJwt(request);
        const { commentId } = reqBody;

        const comment = await Comment.findOne({ _id: commentId, userId: userID });
        if (!comment) {
            return NextResponse.json(
                {
                    error: "Comment not found or you are not authorized to delete it.",
                },
                {
                    status: 401,
                },
            );
        }

        await Comment.deleteOne({ _id: commentId });
        return NextResponse.json({
            message: "Comment deleted successfully.",
        });
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return NextResponse.json({ error: ErrorMsg.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userID = getDataFromJwt(request);
        const { commentId, newText } = reqBody;

        const comment = await Comment.findOne({ _id: commentId, userId: userID });
        if (!comment) {
            return NextResponse.json(
                {
                    error: "Comment not found or you are not authorized to edit it.",
                },
                {
                    status: 401,
                },
            );
        }
        comment.text = newText;
        await comment.save();

        return NextResponse.json({
            message: "Comment updated successfully.",
        });
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return NextResponse.json({ error: ErrorMsg.message }, { status: 500 });
    }
}
