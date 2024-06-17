import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getGenre } from "@/lib/AnimeFetch";

export function generateMetadata({ params }: { params: { genreid: string } }) {
    return {
        title: `${params.genreid} Anime - Unleash Your Adrenaline with Thrilling Adventures`,
        description: `Prepare for heart-pounding excitement with our ${params.genreid} Anime collection. Immerse yourself in a world of relentless battles, heroic quests, and epic showdowns. From pulse-pounding fights to jaw-dropping stunts, we've curated the best ${params.genreid}-packed anime series and movies`,
    };
}
const page = async ({ params }: { params: { genreid: string } }) => {
    const genre = await getGenre(params.genreid);
    return <>{genre && Object.keys(genre).length > 0 ? <VerticalCards title={params.genreid} data={genre} isGenre={true} GenreName={params.genreid} /> : <ServerError />}</>;
};

export default page;
