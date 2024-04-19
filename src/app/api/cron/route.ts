import { NextResponse } from "next/server";

import { connect } from "@/database/db";
import User from "@/model/user.model";

export async function GET() {
    connect();
    try {
        const unverifiedUsers = await User.find({ isVerified: false });

        const expiredUsers = unverifiedUsers.filter((user) => {
            return user.verifyTokenExpiry < new Date();
        });

        const res = await User.deleteMany({ _id: { $in: expiredUsers.map((user) => user._id) } });

        return NextResponse.json({
            message: "Expired unverified users deleted successfully",
            data: res,
            affectedUsers: res.deletedCount,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching or deleting users: " + error,
        });
    }
}
