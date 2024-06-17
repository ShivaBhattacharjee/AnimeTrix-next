import ContentNotFound from "../error/Contentnotfound";

import Cards from "./cards/Cards";

import { getAnimeRelation } from "@/lib/AnimeFetch";

export async function RecommendedAnime({ episode }: { episode: number }) {
    const details = await getAnimeRelation(episode);
    console.log(details);
    return (
        <>
            {details.length > 0 ? (
                <>
                    <h1 className=" text-4xl font-semibold">Recommended</h1>
                    <Cards props={details} />
                </>
            ) : (
                <>
                    <h1 className=" text-4xl font-semibold">Recommended</h1>
                    <ContentNotFound message="recommendations" />
                </>
            )}
        </>
    );
}
