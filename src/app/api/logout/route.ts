import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });
        if (response.cookies.get("token")) {
            response.cookies.delete("token");
        } else {
            return NextResponse.json(
                { error: "No token found", success: false },
                {
                    status: 400,
                },
            );
        }

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
