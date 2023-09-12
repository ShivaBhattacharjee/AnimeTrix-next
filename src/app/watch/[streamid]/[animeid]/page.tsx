import { getAnimeDetails } from "@/lib/AnimeFetch";
import React from "react";

const Page = async ({
    params,
}: {
    params: {
        streamid: string;
        animeid: number;
    };
}) => {
    const Trending = await getAnimeDetails(params.animeid);
    return (
        <div className="flex p-4 justify-center flex-col gap-4 items-center h-screen text-xl font-bold">
            <p className="truncate w-[90%] text-center">Stream ID: {params.streamid}</p>
            <p>Anime ID: {params.animeid}</p>
            <h1>Length : {Object.keys(Trending).length}</h1>
        </div>
    );
};

export default Page;
