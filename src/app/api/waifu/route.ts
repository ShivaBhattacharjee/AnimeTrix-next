import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
import { Error } from "@/types/ErrorTypes";

connect();
type WaifuChatParams = {
    _id: number;
    waifuName: string;
};

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { waifuName, userMessage, waifuResponse } = reqBody;
        const userId = getDataFromJwt(req);
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
        user.waifuChat.unshift({ waifuName, userMessage, waifuResponse });

        if (user.waifuChat.length > 20) {
            user.waifuChat = user.waifuChat.slice(0, 20);
        }

        await user.save();
        return NextResponse.json(
            {
                message: "saved waifu chat",
                success: true,
            },
            {
                status: 200,
            },
        );
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        console.log(error);
        return NextResponse.json(
            {
                message: ErrorMsg.message || "Internal server error" + JSON.stringify(error),
            },
            {
                status: 500,
            },
        );
    }
};

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const waifuName = searchParams.get("waifuname");

    if (!waifuName) {
        return NextResponse.json(
            {
                error: "waifuname parameter is required",
            },
            {
                status: 400,
            },
        );
    }

    try {
        const userId = getDataFromJwt(req);
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

        const filteredChats = user.waifuChat.filter((chat: WaifuChatParams) => chat.waifuName === waifuName);

        return NextResponse.json(
            {
                chats: filteredChats,
            },
            {
                status: 200,
            },
        );
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        console.log("Error:", error);
        return NextResponse.json(
            {
                message: ErrorMsg.message || "Internal server error: " + JSON.stringify(error),
            },
            {
                status: 500,
            },
        );
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const waifuName = searchParams.get("waifuname");
        if (!waifuName) {
            return NextResponse.json(
                {
                    message: "waifuName parameter is required",
                },
                {
                    status: 400,
                },
            );
        }
        const userId = getDataFromJwt(req);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 400,
                },
            );
        }
        const originalChatCount = user.waifuChat.length;
        user.waifuChat = user.waifuChat.filter((chat: WaifuChatParams) => chat.waifuName !== waifuName);
        const deletedChatCount = originalChatCount - user.waifuChat.length;

        await user.save();

        return NextResponse.json(
            {
                message: `${deletedChatCount} chat(s) deleted successfully`,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        const ErrorMsg = error as Error;
        return NextResponse.json(
            {
                message: ErrorMsg.message || "Internal server error " + JSON.stringify(error),
            },
            {
                status: 500,
            },
        );
    }
};
