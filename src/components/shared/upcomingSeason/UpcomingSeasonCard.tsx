"use client";

import Image from "next/image";
import Link from "next/link";

import ReloadFunc from "@/components/error/ReloadFunc";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Anime from "@/types/animetypes";

interface UpcomingSeasonCardProps {
    animeList: Anime[];
    title: string;
}

export default function UpcomingSeasonCard({ animeList, title }: UpcomingSeasonCardProps) {
    return (
        <Card className="h-[700px] overflow-hidden">
            <CardHeader>
                <CardTitle className="text-2xl font-bold capitalize">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[620px] px-4">
                    {animeList?.length > 0 ? (
                        animeList.map((anime) => (
                            <Link href={`details/${anime.id}`} key={anime.id} className="flex items-start space-x-4 py-4 border-b border-border last:border-b-0">
                                <Image src={anime?.image || "/placeholder.svg"} alt={`Cover image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime?.title?.native}`} width={100} height={150} className="rounded-md object-cover w-24 h-36" />
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-lg font-semibold line-clamp-2">{anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime?.title?.native}</h3>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <span>{anime?.countryOfOrigin}</span>
                                        <span>•</span>
                                        <span>{anime?.type}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {anime?.genres?.slice(0, 3).map((genre) => (
                                            <Badge key={genre} variant="secondary" className="text-xs">
                                                {genre}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <ReloadFunc message="Error loading season" />
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
