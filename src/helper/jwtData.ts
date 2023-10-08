import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromJwt = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error("Error decrypting jwt");
    }
};
