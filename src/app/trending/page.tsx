import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import React from "react";
import { getTrendingAnime } from "@/lib/AnimeFetch";
export default async function page() {
    const trending = await getTrendingAnime();
    // The title should not be changed as it is required for infinite scroll.
    return <>{trending.length > 0 ? <VerticalCards title={"Trending"} data={trending} /> : <ServerError />}</>;
}
