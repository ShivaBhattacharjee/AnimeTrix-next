import React from "react";
import { ApiResponse } from "@/types/animetypes";
import ServerError from "./error/ServerError";

const AniScanSearchLayout: React.FC<{ searchResult: ApiResponse | null; setToggle: (value: boolean) => void }> = ({ searchResult, setToggle }) => {
    if (searchResult === null) {
        <ServerError />;
    }

    return (
        <>
            <h1 className=" p-4 text-white text-3xl font-semibold">AniScan Results</h1>
            <button className=" text-left p-4">Aniscan Results</button>

            <div className="text-white grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 m-auto gap-5 p-4 pb-32 md:pb-10">
                {searchResult?.result.map((anime, index) => (
                    <div key={index} className="flex flex-col rounded-lg justify-center  bg-white/25">
                        <img src={anime.image} alt={anime.filename} className=" h-auto w-auto duration-200 hover:scale- rounded-t-lg " />
                        <div className=" p-4  flex flex-col">
                            <h1 className=" w-[98%] truncate">{anime.filename}</h1>
                            <span>Episode: {anime.episode}</span>
                            <span>Popularity : {Math.round(anime.similarity * 100)}% </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AniScanSearchLayout;
