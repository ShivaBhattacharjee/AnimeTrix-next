import { connect } from "@/database/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest) {
    return NextResponse.json({
        message: "This is GET request for history",
    });
}
export async function POST(request: NextRequest) {
    return NextResponse.json({
        message: "This is post request for history",
    });
}
