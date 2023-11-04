"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import Anime from "@/types/animetypes";

interface VerticalCardsProps {
    title: string;
    data: Anime[];
    isGenre?: boolean;
    GenreName?: string;
}
const VerticalCards: React.FC<VerticalCardsProps> = ({ title, data, isGenre, GenreName }) => {
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);
    const [animeData, setAnimeData] = useState<Anime[]>(data);

    const loadMoreData = async () => {
        try {
            const nextPageData = await fetchNextPage(currentPage + 1);
            if (nextPageData.length === 0) {
                setHasMore(false);
            } else {
                setCurrentPage(currentPage + 1);
                setAnimeData([...animeData, ...nextPageData]);
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };
    /**
     * Fetches the next page of data from the Anime API based on the given page number.
     * @param page - The page number to fetch data for.
     * @returns An array of results for the next page.
     */
    const fetchNextPage = async (page: number) => {
        try {
            let apiUrl;
            if (isGenre) {
                apiUrl = `${AnimeApi}/advanced-search?genres=["${GenreName}"]&&page=${page}`;
            } else {
                const formattedTitle = title === "Movie" ? "MOVIE" : title.toLowerCase();
                apiUrl = `${AnimeApi}/${formattedTitle}?perPage=12&page=${page}`;
            }

            const response = await fetch(apiUrl);
            const nextPageData = await response.json();
            return nextPageData.results;
        } catch (error) {
            console.error("Error fetching data for page:", page, error);
            return [];
        }
    };

    const formattedTitle = title.replaceAll("%20", " ");
    return (
        <div className="p-4 pb-40 lg:pb-16 md:m-auto">
            <h1 className="text-3xl lg:text-5xl font-bold text-white">{formattedTitle}</h1>
            <InfiniteScroll
                className="hiddenscroll overflow-y-hidden m-auto  w-full grid grid-cols-2 gap-6 place-items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center lg:p-5 mt-8 "
                dataLength={animeData?.length}
                next={loadMoreData}
                hasMore={hasMore}
                endMessage={<span className="text-lg text-white gap-3 m-auto w-full text-center flex items-center justify-center pt-12 font-semibold">You&rsquo;ve hit the void, nothing left, scroll up for giggles!</span>}
                loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                    <div className="rounded-lg duration-200 hover:scale-105  bg-white/60 animate-pulse w-40  max-lg:h-56 lg:w-48 h-72" key={index} />
                ))}
            >
                {animeData?.map((anime) => {
                    return (
                        //  math random to remove same keys error better solution is appreciated
                        <div key={Math.random()} className="border-2 border-white/30 card-img rounded-lg">
                            <Link href={`/details/${anime.id}`} className="content-normal overflow-hidden w-full h-full">
                                <div className="md:w-48 h-60  relative overflow-hidden">
                                    <img src={anime?.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime.title?.native}`} className=" rounded-t-lg hover:scale-105 duration-200 h-60 lg:h-64 w-full " draggable="false" loading="lazy" height={400} width={200} />
                                </div>
                                <div className="flex flex-col gap-3 p-2">
                                    <span className="truncate font-semibold w-32 lg:w-44 text-sm md:text-xl lg:text-lg capitalize">{anime.title.english || anime.title.romaji || anime.title.native}</span>
                                    {anime?.totalEpisodes !== null && anime?.totalEpisodes !== undefined ? (
                                        <div className="truncate w-32 lg:w-44 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center">
                                            {anime?.status === "Ongoing" && <div className="green w-2 lg:w-3 h-2 lg:h-3  rounded-full bg-green-500"></div>}
                                            <span className=" font-semibold"> Ep: {anime?.totalEpisodes}</span>
                                        </div>
                                    ) : (
                                        <div className="truncate w-32 lg:w-44 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center">
                                            <span> Ep: Unknown</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default VerticalCards;
