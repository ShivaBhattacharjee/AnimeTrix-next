import React from "react";

const Page = ({
    params,
}: {
    params: {
        streamid: string;
        animeid: number;
    };
}) => {
    return (
        <div className="flex p-4 justify-center flex-col gap-4 items-center h-screen text-xl font-bold">
            <p className=" truncate w-[90%]">Stream ID: {params.streamid}</p>
            <p>Anime ID: {params.animeid}</p>
        </div>
    );
};

export default Page;
