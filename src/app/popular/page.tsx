import React from "react";

import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getPopularAnime } from "@/lib/AnimeFetch";

export function generateMetadata() {
    return {
        title: "Popular Anime - Dive into the Best Anime Series on AnimeTrix",
        description: "Delve into the world of beloved anime with our Popular Anime section. Discover the all-time favorite anime series and movies that have captured the hearts of fans worldwide. From timeless classics to modern masterpieces, our collection showcases the best of the best. ",
        openGraph: {
            images: "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
        },
    };
}
export default async function page() {
    const Popular = await getPopularAnime();
    return <>{Popular.length > 0 ? <VerticalCards title={"Popular"} data={Popular} /> : <ServerError />}</>;
}
