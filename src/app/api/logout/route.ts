import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();

    try {
        // const response = NextResponse.json({
        //     message: "Logout Successful",
        //     success: true,
        // });

        const token = cookieStore.get("token");

        if (token === undefined || token === null) {
            return NextResponse.json(
                { error: "No token found", success: false },
                {
                    status: 400,
                },
            );
        } else {
            cookies().delete("token");
            return NextResponse.json(
                { error: "Logout Successful", success: true },
                {
                    status: 200,
                },
            );
        }

        // return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
