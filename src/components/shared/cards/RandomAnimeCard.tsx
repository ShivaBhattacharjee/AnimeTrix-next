import React from "react";
import ReloadFunc from "../../error/ReloadFunc";
import Link from "next/link";
import { getRandomAnime } from "@/lib/AnimeFetch";
getRandomAnime;

export async function RandomAnimeCard() {
    const randomAnime = await getRandomAnime();

    if (!randomAnime) {
        return <ReloadFunc message="Error loading random anime" />;
    }

    return (
        <div className="flex justify-center items-center flex-col mt-5">
            <Link href={`/details/${randomAnime.id}`} className="content-normal w-full h-full">
                <div className="md:w-48 md:h-64 h-56 w-40 relative">
                    <img src={randomAnime?.image} alt={`an image of ${randomAnime?.title?.userPreferred || randomAnime?.title?.english || randomAnime?.title?.romaji || randomAnime.title?.native}`} className="rounded-lg hover:scale-105 duration-200 md:w-48 md:h-64 h-56 w-40" draggable={false} />
                </div>
            </Link>
            <h1 className=" truncate w-[70%] m-auto text-center mb-2">{randomAnime?.title?.userPreferred || randomAnime?.title?.english || randomAnime?.title?.romaji || randomAnime?.title?.native?.toLocaleLowerCase()}</h1>
            <div className="flex gap-3 text-sm w-[70%] justify-center items-center truncate m-auto">
                <span>{randomAnime?.type}</span>
                <span>{randomAnime?.subOrDub?.toLocaleUpperCase()}</span>
            </div>
        </div>
    );
}
