"use client";

import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function AiringScheduleCard({ airingData }: AiringScheduleCardProps) {
    const daysOfWeek: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const [currentDay, setCurrentDay] = useState<DayOfWeek>(daysOfWeek[new Date().getDay()]);
    const [animeForCurrentDay, setAnimeForCurrentDay] = useState<Anime[] | undefined>(airingData[currentDay]);

    useEffect(() => {
        const currentDayData = airingData[currentDay];
        setAnimeForCurrentDay(currentDayData || []);
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
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <Card className="w-full">
            <ScrollArea className="h-[600px]">
                <CardContent className="p-6">
                    {!animeForCurrentDay || animeForCurrentDay.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-center">
                            <p className="text-muted-foreground">No schedule found for {currentDay}</p>
                        </div>
                    ) : (
                        animeForCurrentDay.map((anime: Anime) => (
                            <Link href={`/details/${anime.id}`} key={anime.id} className="block mb-4 last:mb-0">
                                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors">
                                    <img src={anime.coverImage} alt={`Cover of ${anime?.title?.romaji || anime?.title?.english || anime.title?.native}`} className="w-16 h-24 object-cover rounded-md" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold truncate">{anime?.title?.romaji || anime?.title?.english || anime.title?.native}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Episode {anime.airingEpisode} - {formatTime(anime.airingAt)}
                                        </p>
                                    </div>
                                    <PlayCircleIcon className="w-6 h-6 text-primary" />
                                </div>
                            </Link>
                        ))
                    )}
                </CardContent>
            </ScrollArea>
            <CardFooter className="flex justify-between items-center p-4 bg-muted">
                <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                    <ArrowLeftIcon className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium capitalize">{currentDay}</span>
                <Button variant="outline" size="icon" onClick={handleNextDay}>
                    <ArrowRightIcon className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
