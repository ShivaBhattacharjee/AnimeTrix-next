"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Anime from "@/types/animetypes";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import SpinLoading from "@/components/loading/SpinLoading";
import { ArrowUp } from "lucide-react";
interface VerticalCardsProps {
    title: string;
    data: Anime[];
}
const VerticalCards: React.FC<VerticalCardsProps> = ({ title, data }) => {
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);
    const [animeData, setAnimeData] = useState<Anime[]>(data);

    const loadMoreData = async () => {
        try {
            const nextPageData = await fetchNextPage(currentPage + 1);
            if (nextPageData.length === 0) {
                setHasMore(false); // No more data to load
            } else {
                setCurrentPage(currentPage + 1);
                setAnimeData([...animeData, ...nextPageData]);
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };
    const fetchNextPage = async (page: number) => {
        try {
            const formattedTitle = title === "Movie" ? "MOVIE" : title.toLowerCase();
            const response = await fetch(`${AnimeApi}/${formattedTitle}?perPage=8&page=${page}`);
            const nextPageData = await response.json();
            return nextPageData.results;
        } catch (error) {
            console.error("Error fetching data for page:", page, error);
            return [];
        }
    };

    return (
        <div className="p-4 pb-40 lg:pb-16 md:m-auto">
            <h1 className="text-3xl lg:text-5xl font-bold">{title}</h1>
            <InfiniteScroll
                dataLength={animeData.length}
                next={loadMoreData}
                hasMore={hasMore}
                endMessage={
                    <span className="text-lg text-white gap-3 text-center flex items-center justify-center pt-12 font-semibold">
                        You&rsquo;ve hit the void, nothing left, scroll up for giggles!
                        <ArrowUp />
                    </span>
                }
                loader={
                    <div className=" flex justify-center items-center mt-5">
                        <SpinLoading />
                    </div>
                }
            >
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center lg:p-5 mt-8 overflow-hidden">
                    {animeData.map((anime) => {
                        return (
                            <div key={anime.id} className=" border-2 border-white/30 card-img rounded-lg">
                                {" "}
                                {/* Add a unique key for each mapped element */}
                                <Link href={`/details/${anime.id}`} className="content-normal overflow-hidden w-full h-full">
                                    <div className="md:w-48 h-60 w-50 relative overflow-hidden">
                                        <img src={anime?.image} alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime.title?.native}`} className=" rounded-t-lg hover:scale-105 duration-200 h-60 lg:h-64 w-full " draggable="false" loading="lazy" height={400} width={200} />
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
                                                <span> Ep: 0</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default VerticalCards;
