import React from "react";

import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getTrendingAnime } from "@/lib/AnimeFetch";

export function generateMetadata() {
    return {
        title: "Trending Anime - Discover the Hottest Shows on AnimeTrix",
        description: "Explore the hottest trending anime series and movies right here at Trending Anime! Stay up-to-date with the latest and most popular titles in the world of anime. Dive into a world of excitement, adventure, and stunning animation with our carefully curated selection.",
        openGraph: {
            images: "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
        },
    };
}
export default async function page() {
    const trending = await getTrendingAnime();
    // The title should not be changed as it is required for infinite scroll.
    return <>{trending.length > 0 ? <VerticalCards title={"Trending"} data={trending} /> : <ServerError />}</>;
}
