import React from 'react';
import ReloadFunc from '../error/ReloadFunc';
import Image from 'next/image';
import Link from 'next/link';
const getRandomAnime = async () => {
    try {
        const response = await fetch("https://animetrix-api.vercel.app/meta/anilist/random-anime", {
            cache: "no-store"
        });

        const data = await response.json(); // Parse the response JSON
        return data;
    } catch (error) {
        console.error("Error fetching random anime:", error);
        return null; // Return null on error
    }
};

export async function RandomAnimeCard() {
    const randomAnime = await getRandomAnime();

    if (!randomAnime) {
        return (
            <ReloadFunc message='Error loading random anime' />
        );
    }

    return (
        <div className='flex flex-col mt-5'>
            <Link href={`/details/${randomAnime.id}`} className='content-normal w-full h-full'>
                <div className='md:w-48 md:h-64 h-56 w-40 relative'>
                    <img
                        src={randomAnime?.image}
                        alt={`an image of ${randomAnime?.title?.userPreferred || randomAnime?.title?.english || randomAnime?.title?.romaji || randomAnime.title?.native}`}
                        className='rounded-lg hover:scale-105 duration-200 md:w-48 md:h-64 h-56 w-40'
                        draggable={false}
                    />
                </div>
            </Link>
            <h1 className='truncate m-auto w-32 lg:w-44 p-2 text-sm md:text-xl lg:text-lg capitalize'>
                {randomAnime?.title?.userPreferred ||
                    randomAnime?.title?.english ||
                    randomAnime?.title?.romaji ||
                    randomAnime?.title?.native?.toLocaleLowerCase()}
            </h1>
            <div className="flex gap-3 text-sm  w-32 truncate m-auto">
                <span>{randomAnime?.type}</span>
                <span>{randomAnime?.subOrDub?.toLocaleUpperCase()}</span>
            </div>
        </div>
    );
}
