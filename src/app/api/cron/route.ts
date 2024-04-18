import { NextResponse } from "next/server";

import { connect } from "@/database/db";
import User from "@/model/user.model";

export async function GET() {
    connect();
    try {
        const unverifiedUsers = await User.find({ isVerified: false });
        const res = await User.deleteMany({ isVerified: false });
        return NextResponse.json({
            message: "Unverified users deleted successfully",
            data: res,
            affectedUsers: unverifiedUsers.length,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching users" + error,
        });
    }
}
