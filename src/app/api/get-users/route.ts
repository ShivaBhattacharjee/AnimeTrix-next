import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { Error } from "@/types/ErrorTypes";
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password");
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
