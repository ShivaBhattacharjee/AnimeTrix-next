"use client";

import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Anilist } from "@/types/animetypes";
import { getTrendingAnime } from "@/lib/AnimeFetch";
import AnimeCard from "../cards/animeCard/customCard";

const Trending = () => {
    const [animeList, setAnimeList] = useState<Anilist[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchPopularAnimes = async () => {
            setIsLoading(true);
            try {
                const data = await getTrendingAnime();
                setAnimeList(data);
            } catch (error) {
                console.error("Error fetching popular animes", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPopularAnimes();
    }, []);

    return (
        <section className="container mx-auto px-0 space-y-4 flex flex-col">
            <h2 className="text-2xl lg:text-4xl font-semibold mb-4">Trending Now</h2>
            <Carousel
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent className="gap-4">
                    {animeList.map((anime, idx) => (
                        <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/5" key={idx}>
                            <AnimeCard anime={anime} isLoading={isLoading} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
};

export default Trending;
