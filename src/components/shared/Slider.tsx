"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import { Calendar, ChevronLeft, ChevronRight, Clock, InfoIcon, List, Play, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getTrendingAnime } from "@/lib/AnimeFetch";
import { cn } from "@/lib/utils";
import { Anilist } from "@/types/animetypes";

const Hero = () => {
    const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    const [trendingAnimes, setTrendingAnimes] = useState<Anilist[]>([]);

    useEffect(() => {
        const fetchTrendingAnimes = async () => {
            const data = await getTrendingAnime();
            setTrendingAnimes(data);
        };

        fetchTrendingAnimes();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
    };

    useEffect(() => {
        if (trendingAnimes.length > 0 && sliderRef) {
            sliderRef.slickGoTo(0);
        }
    }, [trendingAnimes, sliderRef]);

    const truncateDescription = (description: string) => {
        const maxLength = 250;
        return description.length > maxLength ? description.slice(0, maxLength) + "..." : description;
    };

    return (
        <div className="relative overflow-hidden text-white h-[calc(100vh-5rem)]">
            <div className="relative h-full">
                <Slider ref={setSliderRef} {...settings}>
                    {trendingAnimes.map((anime, index) => (
                        <motion.div key={index} className="relative w-full h-[80vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <div className="relative h-full w-full">
                                <div className="md:hidden block">
                                    <Image src={anime.image} alt={anime.title.english} layout="fill" objectFit="cover" objectPosition="center" className="absolute inset-0 opacity-60" />
                                </div>
                                <div className="hidden md:block">
                                    <Image src={anime.cover} alt={anime.title.english} layout="fill" objectFit="cover" objectPosition="center" className="absolute inset-0 opacity-60" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-100" />
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,_0,_0,_0.6)_0%,_rgba(0,_0,_0,_0)80%)]" />
                                <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 lg:p-12 w-full">
                                    <div className="text-white px-3 py-1 rounded-md font-semibold text-xs w-fit" style={{ backgroundColor: anime.color }}>
                                        #Trending {index + 1}
                                    </div>

                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 max-w-4xl">{anime.title.english ? anime.title.english : anime.title.native || anime.title.userPreferred}</h1>
                                    <div className="mb-2 sm:mb-4">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                            {anime.releaseDate && (
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <span className="font-semibold">
                                                        <Calendar className="w-5 h-5" />
                                                    </span>
                                                    <span>{anime.releaseDate}</span>
                                                </div>
                                            )}
                                            {anime.duration && (
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <span className="font-semibold">
                                                        <Clock className="w-5 h-5" />
                                                    </span>
                                                    <span>{anime.duration} min</span>
                                                </div>
                                            )}
                                            {anime.type && (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">
                                                        <PlayCircle className="w-5 h-5" />
                                                    </span>
                                                    <span>{anime.type}</span>
                                                </div>
                                            )}

                                            {anime.totalEpisodes && (
                                                <div className="flex items-center gap-1 sm:gap-2 px-1 bg-opacity-30 rounded-md">
                                                    <span className="font-semibold">
                                                        <List className="w-5 h-5" />
                                                    </span>
                                                    <span>{anime.totalEpisodes}</span>
                                                </div>
                                            )}
                                            {anime.status && (
                                                <div className="flex items-center gap-1 sm:gap-2  px-1 bg-opacity-30 rounded-md" style={{ backgroundColor: anime.color }}>
                                                    <span className="font-semibold">Status:</span>
                                                    <span>{anime.status}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p
                                        className="text-xs sm:text-sm mb-4 max-w-2xl font-extralight hidden sm:block"
                                        dangerouslySetInnerHTML={{
                                            __html: truncateDescription(anime.description),
                                        }}
                                    />
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                        <Button>
                                            <Link href={`/details/${anime.id}`} className="flex items-center gap-1">
                                                <Play className="w-5 h-5" fill="true" />
                                                Watch Now
                                            </Link>
                                        </Button>
                                        <Button variant={"secondary"}>
                                            <Link href={`/details/${anime.id}`} className="flex items-center justify-center gap-2">
                                                <InfoIcon className="w-5 h-5" /> More info
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="absolute right-2 sm:right-4 md:right-8 lg:right-14 bottom-2 sm:bottom-4 md:bottom-8 lg:bottom-14 flex flex-row sm:flex-col z-10 space-x-2 sm:space-x-0 sm:space-y-2">
                                    <Button size={"icon"} variant={"outline"} onClick={() => sliderRef?.slickNext()}>
                                        <ChevronRight className="w-6 h-6" />
                                    </Button>
                                    <Button onClick={() => sliderRef?.slickPrev()} size={"icon"} variant={"outline"}>
                                        <ChevronLeft className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Hero;
