import { NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest) {
    const reqBody = await request.json();
    return NextResponse.json({
        message: "Hello from bookmark route",
    });
}
