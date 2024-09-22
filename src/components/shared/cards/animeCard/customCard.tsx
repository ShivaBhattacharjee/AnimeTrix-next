"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { PlayIcon } from "lucide-react";
import { Anilist } from "@/types/animetypes";
import AnimeCardSkeleton from "./skeleton";
import Link from "next/link";

type AnimeCardProps = {
    anime: Anilist;
    isLoading: boolean;
};

export default function AnimeCard({ anime, isLoading }: AnimeCardProps) {
    if (isLoading) {
        return <AnimeCardSkeleton />;
    }

    return (
        <Link href={`/details/${anime.id}`}>
            <Card className="group w-full sm:max-w-[16rem] md:max-w-[18rem] h-[28rem] rounded-lg shadow-lg overflow-hidden transition-all cursor-pointer">
                <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative w-full h-[60%] overflow-hidden">
                        <Image src={anime.image} alt={anime.title.english || anime.title.romaji} fill className="rounded-t-lg object-cover object-center group-hover:scale-110 transition-all duration-400" />
                    </div>
                    <div className="p-4 space-y-3 flex flex-col flex-grow">
                        <CardHeader className="p-0">
                            <h3 className="text-lg font-semibold leading-tight text-secondary-foreground line-clamp-2">{anime.title.english || anime.title.userPreferred || anime.title.native}</h3>
                        </CardHeader>
                        <div className="flex flex-wrap gap-1 overflow-hidden" style={{ maxHeight: "3.6em" }}>
                            {anime.genres.map((genre, index) => (
                                <Badge key={index} className="border-cyan-400/25 text-cyan-400 bg-transparent hover:bg-white/10 text-[10px] font-medium px-2 py-0.5 rounded-md transition-colors">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                        <CardDescription className="text-xs mt-auto">
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <PlayIcon className="w-4 h-4" />
                                    {anime.type}
                                </span>
                                <span>{anime.totalEpisodes} Episodes</span>
                                {anime.releaseDate && <span>{anime.releaseDate}</span>} {/* Conditional rendering */}
                            </div>
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
