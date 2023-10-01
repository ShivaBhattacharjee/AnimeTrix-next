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
                <iframe src={stream.plyr.main}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    title={params.streamid}
                    allow="picture-in-picture"
                    className=" lg:h-[40vh] lg:w-[40vw] h-[30vh] lg:mt-7 p-3 rounded-lg"></iframe>
            ) : (
                <ServerError />
            )}
        </>
    );
};

export default Page;
