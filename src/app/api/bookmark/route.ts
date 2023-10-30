import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helper/jwtData";
// import User from "@/model/user.model";
// import { Error } from "@/types/ErrorTypes";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
    getDataFromJwt(request);
    return NextResponse.json({ message: "Hello World from bookmark route" });
}
export async function POST(request: NextRequest) {
    await request.json();
    return NextResponse.json({ message: "Post request  under development" });
}
export async function DELETE(request: NextRequest) {
    await request.json();
    return NextResponse.json({ message: "Delete request under development" });
}
