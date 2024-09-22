"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import AnimeCard from "./animeCard/customCard";
import AnimeCardSkeleton from "./animeCard/skeleton";

import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import { Anilist } from "@/types/animetypes";

interface VerticalCardsProps {
    title: string;
    data: Anilist[];
    isGenre?: boolean;
    GenreName?: string;
}

const VerticalCards: React.FC<VerticalCardsProps> = ({ title, data, isGenre, GenreName }) => {
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);
    const [animeData, setAnimeData] = useState<Anilist[]>(data);

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-8">{formattedTitle}</h1>

            <InfiniteScroll
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                dataLength={animeData?.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
                        {[...Array(12)].map((_, index) => (
                            <AnimeCardSkeleton key={index} />
                        ))}
                    </div>
                }
                endMessage={<span className="text-lg text-white gap-3 m-auto w-full text-center flex items-center justify-center pt-12 font-semibold">You hit the void, nothing left, scroll up for giggles!</span>}
            >
                {animeData?.map((anime) => <AnimeCard key={anime.id} anime={anime} isLoading={false} />)}
            </InfiniteScroll>
        </div>
    );
};

export default VerticalCards;
