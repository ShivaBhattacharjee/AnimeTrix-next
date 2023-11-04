import React from "react";

import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getAnimeMovies } from "@/lib/AnimeFetch";

export function generateMetadata() {
    return {
        title: "Anime Movies - Cinematic Adventures Await on AnimeTrix",
        description: " Embark on cinematic adventures with our Anime Movies section. Explore a captivating world of animated films that will transport you to fantastical realms and stir your emotions. From epic sagas to heartwarming tales, our collection features a diverse range of anime movies for every taste.",
        openGraph: {
            images: "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
        },
    };
}
export default async function page() {
    const Movies = await getAnimeMovies();
    return <>{Movies.length > 0 ? <VerticalCards title={"Movie"} data={Movies} /> : <ServerError />}</>;
}
