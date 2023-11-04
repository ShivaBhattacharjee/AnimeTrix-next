import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

type DecodedToken = {
    id: number;
};

export const getDataFromJwt = (request: NextRequest): number => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: DecodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN!) as DecodedToken;
        return decodedToken.id;
    } catch (error) {
        throw new Error("Error decrypting jwt: " + error);
    }
};
