"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import { ArrowDownNarrowWide, Frown, RefreshCcw } from "lucide-react";
import Link from "next/link";

import EpisodeLoading from "@/components/loading/EpisodeLoading";
import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import { myCache } from "@/lib/nodecache";
import { EpisodeList } from "@/types/animetypes";

interface EpisodeListsProps {
    animeId: number;
    isStream?: boolean;
    currentlyPlaying?: number;
    animeName: string;
}

const EpisodeLists: React.FC<EpisodeListsProps> = ({ animeId, isStream, currentlyPlaying, animeName }) => {
    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedRange, setSelectedRange] = useState<string>("1-100");
    const [listData, setListData] = useState<EpisodeList[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dub, setDub] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [fillerEpisodes, setFillerEpisodes] = useState<number[]>([]);
    const [hideFiller, setHideFiller] = useState<boolean>(true);

    const getEpisodes = async () => {
        const cachekey = `episodes-${animeId}-${dub}`;
        try {
            setLoading(true);
            const cachedData = myCache.get<EpisodeList[]>(cachekey);
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

    const getFillerEpisodes = async () => {
        const cachekey = `filler-episodes-${animeId}`;
        try {
            const cachedData = myCache.get<number[]>(cachekey);
            if (cachedData) {
                setFillerEpisodes(cachedData);
                return;
            }
            animeName = animeName.replace(/ /g, "-");
            const response = await fetch(`https://filler-list.chaiwala-anime.workers.dev/${animeName}`);
            const data = await response.json();
            console.log("Filler episodes are ", data?.fillerEpisodes);
            const fillerEpisodesNumbers = data?.fillerEpisodes.map(Number);
            myCache.set(cachekey, fillerEpisodesNumbers);
            setFillerEpisodes(fillerEpisodesNumbers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFillerEpisodes();
    }, [currentlyPlaying, animeName]);

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
    const displayedEpisodes = useMemo(() => {
        if (listData.length === 0) return [];

        return listData.filter((anime) => {
            if (filterValue !== "") {
                return anime.number.toString().includes(filterValue);
            }

            const [start, end] = selectedRange.split("-").map(Number);
            const isInRange = anime.number >= start && anime.number <= end;

            if (hideFiller) {
                return isInRange && !fillerEpisodes.includes(anime.number);
            }

            return isInRange;
        });
    }, [listData, filterValue, selectedRange, hideFiller, fillerEpisodes]);

    const handleDubToggle = () => {
        setDub((prevDub) => !prevDub);
    };
    const handleHideFillerToggle = () => {
        setHideFiller((prevHideFiller) => !prevHideFiller);
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
                            {fillerEpisodes.length > 0 && (
                                <div className="flex gap-3 items-center">
                                    <label htmlFor="check" className=" bg-gray-100 relative w-16 h-8 rounded-full">
                                        <input type="checkbox" checked={hideFiller} onChange={handleHideFillerToggle} id="check" className=" sr-only peer" />
                                        <span className=" w-2/5 cursor-pointer h-4/5 bg-black/30 absolute rounded-full left-1 top-1 peer-checked:bg-black peer-checked:left-8 transition-all duration-500"></span>
                                    </label>
                                    <span className=" text-xl font-semibold">Hide Filler</span>
                                </div>
                            )}

                            <div className="flex gap-3 items-center">
                                <label htmlFor="dub" className=" bg-gray-100 relative w-16 h-8 rounded-full">
                                    <input onChange={!loading && handleDubToggle} checked={dub} type="checkbox" id="dub" className=" sr-only peer" />
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
                                .map((anime, index) => {
                                    const isFiller = fillerEpisodes.includes(anime.number);
                                    // console.log("isFiller", isFiller);
                                    return (
                                        <Link
                                            href={`/watch/${anime.id}/${animeId}`}
                                            className={`duration-200 border-2 hover:scale-90 
                                                ${currentlyPlaying == anime.number ? "scale-90 border-2 border-white" : isFiller ? "border-orange-500" : "border-white/60"} 
                                                rounded-lg flex flex-col gap-3`}
                                            key={index}
                                        >
                                            <img src={anime?.image} alt={`an image of ${anime?.title}`} loading="lazy" className="rounded-t-lg border-b-2 border-white/30  cursor-pointer bg-cover h-40 md:h-40" height={200} width={400} />
                                            <div className="flex flex-col items-center">
                                                {currentlyPlaying == anime.number && <SyncLoader color="#fff" size={4} />}
                                                {anime.title ? (
                                                    <h1 className=" p-3 truncate md:w-60 w-40 text-xs md:text-lg">
                                                        {anime.number} . {anime?.title} {isFiller && "(🤓Fillter)"}
                                                    </h1>
                                                ) : (
                                                    <h1 className=" p-2 font-semibold py-3">
                                                        {isFiller ? "Filler Episode" : "Episode"}: {anime.number}
                                                    </h1>
                                                )}
                                                {isFiller && <p className=" text-orange-500 text-xs opacity-80">🤓 You can skip this</p>}
                                            </div>
                                        </Link>
                                    );
                                })}
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
