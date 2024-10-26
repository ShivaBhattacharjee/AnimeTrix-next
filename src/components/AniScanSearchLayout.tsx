"use client";

import { useEffect, useRef, useState } from "react";
import { Frown, Play, Loader2 } from "lucide-react";
import Link from "next/link";
import { AnimeApi } from "@/lib/animeapi/animetrixapi";
import Anime, { ApiResponse } from "@/types/animetypes";
import Toast from "@/utils/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ServerError from "./error/ServerError";

interface AniScanSearchLayoutProps {
    searchResult: ApiResponse | null;
}

export default function AniScanSearchLayout({ searchResult }: AniScanSearchLayoutProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<Anime[]>([]);
    const [select, setSelect] = useState<number>(0);
    const prevAnilist = useRef<number | null>(null);

    const getAnime = async (number: number) => {
        setLoading(true);
        try {
            if (searchResult && prevAnilist.current !== searchResult.result[number].anilist.id) {
                const url = await fetch(`${AnimeApi}/info/${searchResult.result[number].anilist.id}`);
                const response = await url.json();
                const responseArray: Anime[] = [response];
                setView(responseArray);
                console.log(responseArray);
            }
            prevAnilist.current = searchResult?.result[number].anilist.id || null;
            setLoading(false);
        } catch (error) {
            console.error(error);
            Toast.ErrorShowToast("Can't find image!");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAnime(select);
    }, [searchResult?.result, select]);

    if (searchResult === null) {
        return <ServerError />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">Anime Scene Match Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Best Match</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="w-full h-48 rounded-lg" />
                        ) : (
                            view.map((imageSearch: Anime, index: number) => (
                                <div key={index} className="space-y-3">
                                    <Link href={`/details/${imageSearch.id}`}>
                                        <img src={imageSearch.image} alt={imageSearch?.title.english || imageSearch?.title?.userPreferred || imageSearch?.title?.romaji || "No title found"} className="w-full h-48 object-cover rounded-lg transition-transform duration-200 hover:scale-105" />
                                    </Link>
                                    <h2 className="font-semibold text-sm line-clamp-2">{imageSearch.title.userPreferred || imageSearch.title.english || imageSearch.title.romaji}</h2>
                                    <div className="flex items-center gap-2">
                                        {imageSearch.status === "Ongoing" && (
                                            <Badge variant="secondary" className="text-xs px-2 py-1">
                                                Ongoing
                                            </Badge>
                                        )}
                                        <span className="text-xs font-medium">Ep: {imageSearch.totalEpisodes}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Similar Scenes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {searchResult?.result.map((anime, index) => (
                                <Button key={index} variant="outline" className={`p-0 h-auto ${select === index ? "ring-2 ring-primary" : ""}`} onClick={() => setSelect(index)}>
                                    {/* <img src={anime.coverImage} alt={anime.filename} className="w-full h-24 object-cover rounded-t-lg" /> */}
                                    <div className="p-2 text-start w-full">
                                        <p className="font-medium text-xs line-clamp-1">{anime.filename}</p>
                                        <p className="text-xs">Ep: {anime.episode || "Unknown"}</p>
                                        <p className="text-xs">Similarity: {Math.round(anime.similarity * 100)}%</p>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-lg">Expected Scene</CardTitle>
                </CardHeader>
                <CardContent>
                    {searchResult.result[select].video ? (
                        <video src={searchResult.result[select].video} autoPlay muted controls playsInline loop className="rounded-lg w-full max-w-2xl mx-auto" />
                    ) : (
                        <div className="flex items-center justify-center text-xl font-semibold gap-3 h-48">
                            <Frown className="w-6 h-6" />
                            <h2>No Expected Scene Found</h2>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
