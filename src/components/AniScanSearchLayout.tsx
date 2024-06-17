"use client";

import { useEffect, useRef, useState } from "react";
import { Frown } from "lucide-react";
import Link from "next/link";

import ServerError from "./error/ServerError";

import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import Anime, { ApiResponse } from "@/types/animetypes";
import Toast from "@/utils/toast";

interface AniScanSearchLayoutProps {
    searchResult: ApiResponse | null;
}

const AniScanSearchLayout: React.FC<AniScanSearchLayoutProps> = ({ searchResult }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<Anime[]>([]);
    const [select, setSelect] = useState<number>(0);
    const prevAnilist = useRef<number | null>(null);

    const getAnime = async (number: number) => {
        setLoading(true);
        try {
            if (searchResult && prevAnilist.current !== searchResult.result[number].anilist.id) {
                const url = await fetch(`${AnimeApi}/info/${searchResult.result[number].anilist.id}`);
                const response = await url.json();
                const responseArray: Anime[] = [response];
                setView(responseArray);
            }
            prevAnilist.current = searchResult?.result[number].anilist.id || null;
            setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.ErrorShowToast("Can't find image!");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAnime(select);
    }, [searchResult?.result, select, getAnime]);

    if (searchResult === null) {
        return <ServerError />;
    }

    return (
        <>
            {loading ? (
                <div className="p-4">
                    <h1 className="text-3xl lg:text-5xl font-bold">Match</h1>
                    <div className="flex flex-col">
                        <div className="rounded-lg hover:scale-105 duration-200 md:w-48 md:h-64 h-52 w-40 relative mt-4 bg-white/60 animate-pulse" />
                    </div>
                </div>
            ) : (
                view.map((imageSearch: Anime, index: number) => (
                    <div key={index} className="p-3">
                        <h1 className="text-3xl lg:text-5xl font-bold">Match</h1>
                        <Link href={`/details/${imageSearch.id}`}>
                            <img src={imageSearch.image} alt={imageSearch?.title.english || imageSearch?.title?.userPreferred || imageSearch?.title?.romaji || "No title found"} loading="lazy" className=" w-44 rounded-lg duration-200 hover:scale-90 mt-5 md:w-52" />
                        </Link>
                        <h1 className=" font-semibold truncate w-44 mt-2 mb-2">{imageSearch.title.userPreferred || imageSearch.title.english || imageSearch.title.romaji}</h1>
                        <div className="flex gap-5">
                            {imageSearch.status === "Ongoing" && <div className="w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-green-500"></div>}
                            <span className=" font-semibold">Ep: {imageSearch.totalEpisodes}</span>
                        </div>
                    </div>
                ))
            )}
            <div className="text-white grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 m-auto gap-5 p-4">
                {searchResult?.result.map((anime, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelect(index);
                        }}
                        className={` ${select === index && ""}`}
                    >
                        <img src={anime.image} alt={anime.filename} className="h-auto bg-fill w-auto duration-200 hover:scale- rounded-t-lg " />
                        <div className=" p-4  flex flex-col font-semibold">
                            <h1 className=" w-[98%] truncate">{anime.filename}</h1>
                            <span>Episode: {anime.episode || "Unknown"}</span>
                            <span>Similarity : {Math.round(anime.similarity * 100)}% </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" p-4  pb-32 md:pb-10">
                <h1 className=" pb-5 text-3xl lg:text-5xl font-bold">Expected Scene</h1>
                {searchResult.result[select].video != undefined || null ? (
                    <video src={searchResult.result[select].video} autoPlay muted controls playsInline loop className="rounded-lg  w-60 md:w-96" />
                ) : (
                    <div className="flex capitalize items-center justify-center text-3xl font-semibold  gap-3">
                        <Frown />
                        <h1>No Expected Scene Found</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default AniScanSearchLayout;
