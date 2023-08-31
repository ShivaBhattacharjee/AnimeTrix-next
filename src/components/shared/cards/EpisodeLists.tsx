"use client";
import React, { useState, useMemo } from "react";
import { Frown } from "lucide-react";
import Anime from "@/types/animetypes";
import Link from "next/link";

interface EpisodeListsProps {
    listData: Anime[];
    animeId: number;
}

const EpisodeLists: React.FC<EpisodeListsProps> = ({ listData, animeId }) => {
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
                <div className="flex items-center flex-wrap gap-5">
                    <h1 className="text-4xl font-semibold">Episodes</h1>
                </div>
                <div className="flex items-center">
                    <input type="number" placeholder="Search Episode No......" className="bg-transparent search border-2 w-full md:w-56 2xl:w-72 border-white p-2 mr-4 rounded-lg focus:outline-none" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                    {showSelect && (
                        <select className="p-2 bg-transparent border-2 focus:outline-none border-white rounded-lg" value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
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
                <div className="grid gap-4 max-h-64 overflow-y-scroll hiddenscroll grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                    {displayedEpisodes
                        .sort((animeA, animeB) => animeA.number - animeB.number)
                        .map((anime, index) => (
                            <Link href={`/watch/${anime.id}/${animeId}`} className="bg-white/20 duration-200 border-white/20 hover:border-2 hover:scale-90 rounded-lg flex flex-col gap-3" key={index}>
                                <img src={anime.image} alt={`an image of ${anime.title}`} loading="lazy" className="rounded-t-lg border-b-2 border-white/30  cursor-pointer bg-cover h-28 md:h-40" height={200} width={400} />
                                <h1 className="text-center font-semibold mb-3">Episode: {anime.number}</h1>
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
