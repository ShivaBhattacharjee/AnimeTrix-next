"use client";
import React, { useState, useMemo } from "react";
import { Frown } from "lucide-react";
import Anime from "@/types/animetypes";
import Link from "next/link";
import { SyncLoader } from "react-spinners";

interface EpisodeListsProps {
    listData: Anime[];
    animeId: number;
    isStream?: boolean;
    currentlyPlaying?: number;
}

const EpisodeLists: React.FC<EpisodeListsProps> = ({ listData, animeId, isStream, currentlyPlaying }) => {
    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedRange, setSelectedRange] = useState<string>("1-100");

    const episodeRanges = useMemo(() => {
        const numEpisodes = listData.length;
        const rangeCount = Math.ceil(numEpisodes / 100);
        const ranges = [];

        for (let i = 0; i < rangeCount; i++) {
            const start = i * 100 + 1;
            const end = Math.min((i + 1) * 100, numEpisodes);
            ranges.push(`${start}-${end}`);
        }

        return ranges;
    }, [listData]);

    const displayedEpisodes = listData.filter((anime) => {
        if (filterValue === "") {
            const [start, end] = selectedRange.split("-").map(Number);
            return anime.number >= start && anime.number <= end;
        } else {
            return anime.number.toString().includes(filterValue);
        }
    });

    const showSelect = listData.length > 100;

    return (
        <>
            <div className="flex justify-between items-center flex-wrap gap-6" id="episodes">
                <h1 className="text-4xl font-semibold lg:pb-5">Episodes</h1>
                <div className="flex">
                    <input type="number" placeholder="Search Episode No......" className="bg-transparent search border-2 w-full md:w-56 2xl:w-72 dark:border-white border-black p-2 mr-4 rounded-lg focus:outline-none mb-3" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                    {showSelect && (
                        <select className="p-2 dark:bg-black bg-white border-2 h-11 focus:outline-none dark:border-white border-black rounded-lg" value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
                            {episodeRanges.map((range) => (
                                <option key={range} value={range}>
                                    {range}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
            {displayedEpisodes.length > 0 ? (
                <div className={`grid gap-4 max-h-96 overflow-y-scroll hiddenscroll grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ${!isStream && "lg:grid-cols-4 2xl:grid-cols-5"} `}>
                    {displayedEpisodes
                        .sort((animeA, animeB) => animeA.number - animeB.number)
                        .map((anime, index) => (
                            <Link href={`/watch/${anime.id}/${animeId}`} className={`duration-200  border-2 hover:scale-90 ${currentlyPlaying == anime.number ? "scale-90 border-2 border-red-600 bg-white/10 " : "border-black/60 dark:border-white/60 "} rounded-lg flex flex-col gap-3`} key={index}>
                                <img src={anime?.image} alt={`an image of ${anime?.title}`} loading="lazy" className="rounded-t-lg border-b-2 border-white/30  cursor-pointer bg-cover h-28 md:h-40" height={200} width={400} />
                                <div className="flex gap-2 items-center p-2">
                                    {currentlyPlaying == anime.number && <SyncLoader color="red" size={4} />}
                                    <h1 className=" p-2 font-semibold">Episode: {anime.number}</h1>
                                </div>
                            </Link>
                        ))}
                </div>
            ) : (
                <div className="flex capitalize items-center justify-center text-3xl font-semibold  gap-3">
                    <Frown />
                    <h1>No Episodes Found</h1>
                </div>
            )}
        </>
    );
};

export default EpisodeLists;
