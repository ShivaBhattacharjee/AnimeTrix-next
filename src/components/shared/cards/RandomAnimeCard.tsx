import Link from "next/link";

import ReloadFunc from "../../error/ReloadFunc";

import { getRandomAnime } from "@/lib/AnimeFetch";

getRandomAnime;

export async function RandomAnimeCard() {
    const randomAnime = await getRandomAnime();

    if (!randomAnime) {
        return <ReloadFunc message="Error loading random anime" />;
    }

    return (
        <div className="flex flex-col mt-5 justify-start">
            <Link href={`/details/${randomAnime.id}`} className="content-normal w-full h-full">
                <div className="md:w-48 md:h-64 h-56 w-40 relative">
                    <img src={randomAnime?.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${randomAnime?.title?.userPreferred || randomAnime?.title?.english || randomAnime?.title?.romaji || randomAnime.title?.native}`} className="rounded-lg hover:scale-105 text-sm duration-200 md:w-48 md:h-64 h-56 w-40" draggable={false} />
                </div>
            </Link>
            <h1 className=" truncate w-40 mb-2 text-sm md:text-lg justify-start">{randomAnime?.title?.userPreferred || randomAnime?.title?.english || randomAnime?.title?.romaji || randomAnime?.title?.native?.toLocaleLowerCase()}</h1>
            <div className="flex gap-3 text-sm truncate">
                <span>{randomAnime?.type}</span>
                <span>{randomAnime?.subOrDub?.toLocaleUpperCase()}</span>
            </div>
        </div>
    );
}
