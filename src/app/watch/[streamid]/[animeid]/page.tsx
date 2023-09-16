import ServerError from "@/components/error/ServerError";
import EpisodeLists from "@/components/shared/cards/EpisodeLists";
import { getAnimeDetails, getSteamingLink } from "@/lib/AnimeFetch";
import Anime from "@/types/animetypes";
import React from "react";
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
                <div className="flex flex-col lg:flex-row gap-5 justify-between p-4">
                    <div className="text-center h-52 rounded-lg border-2 border-white w-full lg:w-[50%]">
                        <h1>Streaming will be availabe soon</h1>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className=" text-3xl font-semibold text-white">Up next</h1>
                        {details.episodes
                            .slice()
                            .reverse()
                            .map((anime: Anime, index: number) => (
                                <div className="flex md:w-96 text-center flex-col gap-3 rounded-lg bg-white/40 p-4" key={index}>
                                    Episode {anime.number}
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <ServerError />
            )}
        </>
    );
};

export default Page;
