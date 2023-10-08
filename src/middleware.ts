import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/register";
    const token = request.cookies.get("token")?.value || "";
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/but-bro-you-are-already-logged-in", request.nextUrl));
    }
}

export const config = {
    matcher: ["/login", "/register"],
};
