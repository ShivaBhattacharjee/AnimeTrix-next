import { getGenre } from "@/lib/AnimeFetch";
import React from "react";
import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
export async function generateMetadata({ params }: { params: { genreid: string } }) {
    return {
        title: `${params.genreid} Anime - Unleash Your Adrenaline with Thrilling Adventures`,
        description: `Prepare for heart-pounding excitement with our ${params.genreid} Anime collection. Immerse yourself in a world of relentless battles, heroic quests, and epic showdowns. From pulse-pounding fights to jaw-dropping stunts, we've curated the best ${params.genreid}-packed anime series and movies`,
        openGraph: {
            images: "https://media.discordapp.net/attachments/1079039236302446705/1148974653155594302/IMG_20230906_190222_412.jpg?width=1080&height=567",
        },
    };
}
const page = async ({ params }: { params: { genreid: string } }) => {
    const genre = await getGenre(params.genreid);
    return <>{genre && Object.keys(genre).length > 0 ? <VerticalCards title={params.genreid} data={genre} isGenre={true} GenreName={params.genreid} /> : <ServerError />}</>;
};

export default page;
