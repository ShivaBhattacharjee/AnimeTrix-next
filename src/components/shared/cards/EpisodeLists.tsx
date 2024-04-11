"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import { ArrowDownNarrowWide, Frown, RefreshCcw } from "lucide-react";
import Link from "next/link";

import EpisodeLoading from "@/components/loading/EpisodeLoading";
import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import { myCache } from "@/lib/nodecache";
import Anime from "@/types/animetypes";

interface EpisodeListsProps {
    animeId: number;
    isStream?: boolean;
    currentlyPlaying?: number;
}

const EpisodeLists: React.FC<EpisodeListsProps> = ({ animeId, isStream, currentlyPlaying }) => {
    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedRange, setSelectedRange] = useState<string>("1-100");
    const [listData, setListData] = useState<Anime[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dub, setDub] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const getEpisodes = async () => {
        const cachekey = `episodes-${animeId}-${dub}`;
        try {
            setLoading(true);
            const cachedData = myCache.get<Anime[]>(cachekey);
            if (cachedData) {
                setListData(cachedData);
                return;
            }
            const response = await fetch(`${AnimeApi}/episodes/${animeId}?dub=${dub}`);
            const data = await response.json();
            myCache.set(cachekey, data);
            setListData(data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEpisodes();
    }, [dub]);

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

    const handleSortToggle = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const displayedEpisodes =
        listData.length > 0 &&
        listData?.filter((anime) => {
            if (filterValue === "") {
                const [start, end] = selectedRange.split("-").map(Number);
                return anime.number >= start && anime.number <= end;
            } else {
                return anime.number.toString().includes(filterValue);
            }
        });
    const handleDubToggle = () => {
        setDub((prevDub) => !prevDub);
    };
    return (
        <>
            {loading ? (
                <EpisodeLoading />
            ) : (
                <>
                    <div className="flex justify-between items-center flex-wrap gap-6" id="episodes">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-semibold">Episodes</h1>
                            <RefreshCcw onClick={getEpisodes} className={`cursor-pointer`} />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex gap-3 items-center">
                                <label htmlFor="check" className=" bg-gray-100 relative w-16 h-8 rounded-full">
                                    <input onChange={!loading && handleDubToggle} checked={dub} type="checkbox" id="check" className=" sr-only peer" />
                                    <span className=" w-2/5 cursor-pointer h-4/5 bg-black/30 absolute rounded-full left-1 top-1 peer-checked:bg-black peer-checked:left-8 transition-all duration-500"></span>
                                </label>
                                <span className=" text-xl font-semibold">Dub</span>
                            </div>
                            <div className="flex gap-1">
                                <input type="number" placeholder="Search Episode No......" className="bg-transparent search border-2 w-52 border-white  p-2 mr-4 rounded-lg focus:outline-none mb-3" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                                <ArrowDownNarrowWide size={30} className={`mt-2 cursor-pointer ${sortOrder === "asc" && "rotate-180"} duration-300`} onClick={handleSortToggle} />
                            </div>
                            {listData.length >= 100 && (
                                <select className="p-2 bg-black border-2 h-11 focus:outline-none border-white rounded-lg" value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
                                    {episodeRanges.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    {Array.isArray(displayedEpisodes) && displayedEpisodes.length > 0 ? (
                        <div className={`grid gap-4 max-h-96 overflow-y-scroll hiddenscroll grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ${!isStream && "lg:grid-cols-4 2xl:grid-cols-5"} `}>
                            {displayedEpisodes
                                .sort((animeA, animeB) => {
                                    const orderMultiplier = sortOrder === "asc" ? 1 : -1;
                                    return orderMultiplier * (animeA.number - animeB.number);
                                })
                                .map((anime, index) => (
                                    <Link href={`/watch/${anime.id}/${animeId}`} className={`duration-200  border-2 hover:scale-90 ${currentlyPlaying == anime.number ? "scale-90 border-2 border-white  " : "border-white/60 "} rounded-lg flex flex-col gap-3`} key={index}>
                                        <img src={anime?.image} alt={`an image of ${anime?.title}`} loading="lazy" className="rounded-t-lg border-b-2 border-white/30  cursor-pointer bg-cover h-28 md:h-40" height={200} width={400} />
                                        <div className="flex gap-2 items-center p-2">
                                            {currentlyPlaying == anime.number && <SyncLoader color="#fff" size={4} />}
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
            )}
        </>
    );
};

export default EpisodeLists;
