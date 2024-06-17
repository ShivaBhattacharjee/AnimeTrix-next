"use client";

// AiringScheduleCard.tsx

import { useEffect, useState } from "react";
import { ArrowLeftToLine, ArrowRightToLine, PlayCircle } from "lucide-react";
import Link from "next/link";

type DayOfWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

interface Anime {
    id: string;
    coverImage: string;
    title?: {
        userPreferred: string;
        english: string;
        romaji: string;
        native: string;
    };
    airingEpisode: number;
    airingAt: number;
}

interface AiringScheduleCardProps {
    airingData: {
        [key in DayOfWeek]: Anime[];
    };
}

const AiringScheduleCard: React.FC<AiringScheduleCardProps> = ({ airingData }) => {
    const daysOfWeek: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const [currentDay, setCurrentDay] = useState<DayOfWeek>(daysOfWeek[new Date().getDay()]);
    const [animeForCurrentDay, setAnimeForCurrentDay] = useState<Anime[] | undefined>(airingData[currentDay]);
    console.log(airingData);
    useEffect(() => {
        console.log("Current Day:", currentDay);

        const currentDayData = airingData[currentDay];

        if (currentDayData && currentDayData.length > 0) {
            setAnimeForCurrentDay(currentDayData);
        } else {
            console.log(`No anime found for ${currentDay}`);
            setAnimeForCurrentDay([]);
        }
    }, [airingData, currentDay]);

    const handlePreviousDay = () => {
        const currentIndex = daysOfWeek.indexOf(currentDay);
        const previousIndex = (currentIndex + 6) % 7;
        setCurrentDay(daysOfWeek[previousIndex]);
    };

    const handleNextDay = () => {
        const currentIndex = daysOfWeek.indexOf(currentDay);
        const nextIndex = (currentIndex + 1) % 7;
        setCurrentDay(daysOfWeek[nextIndex]);
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPM = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${amPM}`;
    };

    return (
        <div className="flex gap-2">
            <div className={`border-2 border-white/20 h-auto max-h-[400px] md:max-h-[600px] w-full rounded-lg mt-5 overflow-y-auto overflow-hidden`}>
                <div className="flex flex-col gap-3">
                    <div className="p-4">
                        <div className="flex flex-col gap-3 ">
                            {!animeForCurrentDay || animeForCurrentDay.length === 0 ? (
                                <div className="flex justify-center items-center text-center">
                                    <h1>Oops! No schedule found for {currentDay}</h1>
                                </div>
                            ) : (
                                animeForCurrentDay &&
                                animeForCurrentDay.map((anime: Anime) => (
                                    <div className={`flex border-b-2 border-white/20 justify-between items-center`} key={anime?.id}>
                                        <Link href={`/details/${anime.id}`}>
                                            <div className="flex items-center gap-4 mb-2">
                                                <img height={200} width={400} loading="lazy" src={anime.coverImage} alt={`an image of ${anime?.title?.romaji || anime?.title?.english || anime.title?.native}`} className="w-24 text-sm object-cover hover:scale-90 duration-200  rounded-lg" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm w-24 truncate mb-3 md:text-2xl md:w-[400px] lg:w-full ">{anime?.title?.romaji || anime?.title?.english || anime.title?.native}</span>
                                                    <div className="flex gap-2 items-center flex-wrap text-sm lg:text-xl">
                                                        <span>Ep: {anime.airingEpisode} -</span>
                                                        <span className={`text-gray-300`}>{formatTime(anime.airingAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={`/details/${anime.id}`}>
                                            <PlayCircle className="cursor-pointer lg:scale-150" />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className={`sticky bottom-0 bg-white/5"} bg-gradient-to-r from-black to-black/30 backdrop-blur-xl overflow-hidden p-3`}>
                    <div className="flex justify-between items-center  md:max-w-[400px] m-auto">
                        <button onClick={handlePreviousDay}>
                            <ArrowLeftToLine className="scale-125" />
                        </button>
                        <span className="text-2xl capitalize">{currentDay}</span>
                        <button onClick={handleNextDay}>
                            <ArrowRightToLine className=" scale-125" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiringScheduleCard;
