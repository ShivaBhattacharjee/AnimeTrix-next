import React from "react";

import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getGenre } from "@/lib/AnimeFetch";

export function generateMetadata({ params }: { params: { genreid: string } }) {
    return {
        title: `${params.genreid} Anime - Unleash Your Adrenaline with Thrilling Adventures`,
        description: `Prepare for heart-pounding excitement with our ${params.genreid} Anime collection. Immerse yourself in a world of relentless battles, heroic quests, and epic showdowns. From pulse-pounding fights to jaw-dropping stunts, we've curated the best ${params.genreid}-packed anime series and movies`,
        openGraph: {
            images: "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
        },
    };
}
const page = async ({ params }: { params: { genreid: string } }) => {
    const genre = await getGenre(params.genreid);
    return <>{genre && Object.keys(genre).length > 0 ? <VerticalCards title={params.genreid} data={genre} isGenre={true} GenreName={params.genreid} /> : <ServerError />}</>;
};

export default page;
