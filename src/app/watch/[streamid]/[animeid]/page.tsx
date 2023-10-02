import ServerError from "@/components/error/ServerError";
import CharactersLoading from "@/components/loading/CharactersLoading";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import { RecommendedAnime } from "@/components/shared/RecommendedAnime";
import EpisodeLists from "@/components/shared/cards/EpisodeLists";
import CharacterCard from "@/components/shared/cards/characterCard";
import { getAnimeDetails, getSteamingLink } from "@/lib/AnimeFetch";
import React, { Suspense } from "react";
export function generateMetadata({
    params,
}: {
    params: {
        streamid: string;
        animeid: number;
    };
}) {
    return {
        title: `Watching ${params.streamid} on AnimeTrix`,
    };
}
const Page = async ({
    params,
}: {
    params: {
        streamid: string;
        animeid: number;
    };
}) => {
    const details = await getAnimeDetails(params.animeid);
    const stream = await getSteamingLink(params.streamid);
    return (
        <>
            {Object.keys(details || stream).length > 0 ? (
                <section className="p-2 min-h-screen pb-40 lg:pb-0">
                    <div className=" w-full">
                        <div className="flex justify-between w-full lg:flex-row flex-col">
                            <div className="flex flex-col w-full">
                                <iframe src={stream?.plyr?.main || stream?.plyr?.backup}
                                    scrolling="no"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    title={params.streamid}
                                    allow="picture-in-picture"
                                    className="w-full rounded-lg h-[30vh] lg:h-[50vh] md:w-[50%]"></iframe>
                                <div className="mt-2">
                                    <span className="text-lg lg:text-2xl text-white/70">Episode :  {stream?.info?.episode}</span>
                                    <h1 className="font-semibold text-xl lg:text-3xl">{stream?.info?.title || "unknown"}</h1>
                                </div>
                            </div>

                            <div className=" mt-3 lg:hidden">
                                <Suspense fallback={<EpisodeLoading />}>
                                    <EpisodeLists listData={details.episodes} animeId={params.animeid} />
                                </Suspense>
                            </div>
                            <h1 className=" hidden lg:block">Desktop Episode view under development</h1>

                        </div>
                    </div>
                    <div className="mt-6">
                        <Suspense fallback={<CharactersLoading />}>
                            <CharacterCard characters={details.characters} />
                        </Suspense>
                    </div>
                    <div className="mt-12">
                        <Suspense fallback={<RecommendedLoading />}>
                            <RecommendedAnime episode={params.animeid} />
                        </Suspense>
                    </div>
                </section>
            ) : (
                <ServerError />
            )}
        </>
    );
};

export default Page;
