import ServerError from "@/components/error/ServerError";
import { getAnimeDetails, getSteamingLink } from "@/lib/AnimeFetch";
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
            {Object.keys(details).length > 0 ? (
                <div className="flex p-4 justify-center flex-col gap-4 items-center h-screen text-xl font-bold">
                    <p className="truncate w-[90%] text-center">Stream ID: {params.streamid}</p>
                    <p>Anime ID: {params.animeid}</p>
                    <h1>Episode Length : {Object.keys(details).length}</h1>
                    <h1>Stream Length: {Object.keys(stream).length}</h1>
                    <a href={stream.download} target="_blank" className=" p-4 bg-white text-black font-semibold rounded-lg">
                        Download
                    </a>
                </div>
            ) : (
                <ServerError />
            )}
        </>
    );
};

export default Page;
