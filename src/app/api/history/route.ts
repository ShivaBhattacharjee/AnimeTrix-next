import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();
type history = {
    streamId: string;
};
export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromJwt(request);
        const { searchParams } = new URL(request.url);
        const Page = parseInt(searchParams.get("page") ?? "1", 10);
        const limit = 12;
        const user = await User.findOne({ _id: userId }).select("-password");
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

        if (isNaN(Page) || Page <= 0) {
            return NextResponse.json({
                userHistory: {
                    nextPage: false,
                    history: user.watchHistory,
                },
            });
        }
        const startIndex = (Page - 1) * limit;
        const endIndex = Page * limit;

        const history = user.watchHistory.slice(startIndex, endIndex);
        const paginatedResult = {
            nextPage: user.watchHistory.length > endIndex ? true : false,
            history,
        };
        return NextResponse.json({
            userHistory: paginatedResult,
            page: Page,
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
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { streamId, animeId, coverImage, image, episode, title } = reqBody;
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({
                error: "User not found",
            });
        }
        const existingHistoryIndex = user.watchHistory.findIndex((history: history) => history.streamId === streamId);
        if (existingHistoryIndex !== -1) {
            user.watchHistory.splice(existingHistoryIndex, 1);
        }
        user.watchHistory.unshift({ streamId, animeId, coverImage, image, episode, title });
        await user.save();
        return NextResponse.json(
            {
                message: "Added to history",
                success: true,
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
                status: 401,
            },
        );
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { streamId } = reqBody;
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({
                message: "User not found",
            });
        }
        const historyIndex = user.watchHistory.findIndex((history: history) => history.streamId === streamId);
        if (historyIndex === -1) {
            return NextResponse.json(
                {
                    error: "video not found",
                },
                {
                    status: 404,
                },
            );
        }

        user.watchHistory.splice(historyIndex, 1);
        await user.save();

        return NextResponse.json(
            {
                message: "video removed",
            },
            {
                status: 201,
            },
        );
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json(
            {
                error: Error,
            },
            {
                status: 401,
            },
        );
    }
}
