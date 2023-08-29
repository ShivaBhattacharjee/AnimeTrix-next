"use client";
import React from "react";
import Link from "next/link";
import Anime from "@/types/animetypes";
import { ArrowRight } from "lucide-react";
type ModalCloseFunction = () => void;
const SearchCardLists = ({ results, modalClose }: { results: Anime[]; modalClose: ModalCloseFunction }) => {
    return (
        <>
            {results.slice(0, 12)?.map((anime, index) => (
                <div key={index}>
                    <Link href={`/details/${anime?.id}`} className="flex overflow-hidden gap-3 items-center" onClick={modalClose}>
                        <img src={anime.image} alt="" className=" w-28 rounded-lg duration-200 hover:scale-90" />
                        <div className="flex flex-col gap-3 font-semibold overflow-hidden">
                            <h1 className=" font-semibold text-sm md:text-xl truncate w-[90%]">{anime?.title?.userPreferred || anime.title.romaji || anime.title.english || anime.title.native}</h1>
                            <div className="flex flex-wrap gap-3">
                                {anime.genres.map((genres) => (
                                    <span key={Math.random()} className="text-sm md:text-xl">
                                        {genres}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-3 text-sm md:text-lg">
                                <span>Episode : {anime.totalEpisodes || 0}</span>
                                <span>Type : {anime.type || "Unknown"}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            <Link href={"/trending"} className="text-lg gap-3 font-semibold flex items-center" onClick={modalClose}>
                View More
                <ArrowRight />
            </Link>
        </>
    );
};

export default SearchCardLists;
