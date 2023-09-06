import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import React from "react";
import { getAnimeMovies } from "@/lib/AnimeFetch";
export function generateMetadata() {
    return {
        title: "Anime Movies - Cinematic Adventures Await on AnimeTrix",
        description: " Embark on cinematic adventures with our Anime Movies section. Explore a captivating world of animated films that will transport you to fantastical realms and stir your emotions. From epic sagas to heartwarming tales, our collection features a diverse range of anime movies for every taste.",
        openGraph: {
            images: "https://media.discordapp.net/attachments/1079039236302446705/1148974653155594302/IMG_20230906_190222_412.jpg?width=1080&height=567",
        },
    };
}
export default async function page() {
    const Movies = await getAnimeMovies();
    return <>{Movies.length > 0 ? <VerticalCards title={"Movie"} data={Movies} /> : <ServerError />}</>;
}
