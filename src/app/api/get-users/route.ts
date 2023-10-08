import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User found",
            userData: user,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 400,
            },
        );
    }
}
