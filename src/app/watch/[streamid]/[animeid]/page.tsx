import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Flag, Play, Info, List, MessageSquare, Users } from "lucide-react";

import AddToBookmark from "@/components/buttons/AddToBookmark";
import Share from "@/components/buttons/Share";
import CommentSection from "@/components/CommentSection";
import ServerError from "@/components/error/ServerError";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import RelationLoading from "@/components/loading/RelationLoading";
import NextAiringEpisode from "@/components/NextAiringEpisode";
import EpisodeLists from "@/components/shared/cards/EpisodeLists";
import RelationCard from "@/components/shared/cards/RelationCard";
import { RecommendedAnime } from "@/components/shared/RecommendedAnime";
import AddToHistory from "@/lib/addToHistory";
import { getAnimeDetails, getDownloadLink, getSteamingLink } from "@/lib/AnimeFetch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
    params: {
        streamid: string;
        animeid: number;
    };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const anime = await getAnimeDetails(params.animeid);
        const description = anime?.description || "Unknown Description";
        const formattedDescription = description?.replace(/<\/?[^>]+(>|$)/g, "");
        return {
            title: `${`Watching ${params.streamid} on AnimeTrix` || "Opps!! No Title Found"} On AnimeTrix Watch Or Download For Free`,
            description: formattedDescription || "Opps!! No Description Found",
            openGraph: {
                images: anime?.bannerImage || "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
            },
        };
    } catch (error) {
        console.error("Error fetching anime details:", error);
        <ServerError />;
        return {
            title: "Error",
            description: "Oops! An error occurred while fetching anime details.",
            openGraph: {
                images: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
        };
    }
}
const Page = async ({ params }: Props) => {
    const details = await getAnimeDetails(params.animeid);
    const stream = await getSteamingLink(params.streamid);
    const download = await getDownloadLink(params.streamid);
    const getAbbreviatedMonth = (month: number): string => {
        const abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return abbreviatedMonths[month];
    };
    // Get the next airing date for the anime.
    const airingDate = new Date(details.nextAiringEpisode?.airingTime * 1000);

    // Extract the day, month, and year from the airing date.
    const day = airingDate.getDate();
    const month = getAbbreviatedMonth(airingDate.getMonth());
    const year = airingDate.getFullYear();
    const currentYear = new Date().getFullYear();

    // Format the time string using the 12-hour clock format.
    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const timeString = airingDate.toLocaleString(undefined, options);

    // Format the airing date string based on the year.
    let formattedAiringDate;
    if (year === currentYear) {
        formattedAiringDate = `${day} ${month} at ${timeString}`;
    } else {
        formattedAiringDate = `${day} ${month} ${year} at ${timeString}`;
    }
    return (
        <div 
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white"
        >
            {Object.keys(details || stream).length > 0 ? (
                <section className="container mx-auto px-4 py-8 space-y-12">
                    <Suspense fallback={<></>}>
                        <AddToHistory 
                            streamId={params.streamid} 
                            animeId={params.animeid} 
                            title={stream?.info?.title || "unknown"} 
                            episode={stream?.info?.episode || "unknown"} 
                            coverImage={details?.bannerImage || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} 
                            image={details?.coverImage || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} 
                        />
                    </Suspense>

                    <Card className="overflow-hidden bg-gray-800/30 backdrop-blur-lg border-0 shadow-2xl">
                        <CardContent className="p-0">
                            <div className="aspect-video w-full relative">
                                <iframe 
                                    src={stream?.plyr?.main || stream?.plyr?.backup} 
                                    scrolling="no" 
                                    frameBorder="0" 
                                    allowFullScreen={true} 
                                    title={params.streamid} 
                                    allow="picture-in-picture" 
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                            <div className="p-8">
                                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                    {stream?.info?.title || "Unknown"}
                                </h1>
                                <p className="text-xl text-gray-300 mb-6">
                                    Episode: {stream?.info?.episode || "Unknown"}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="default" className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                                        <Play className="mr-2 h-5 w-5" />
                                        Watch Now
                                    </Button>
                                    <Button variant="outline" className="border-gray-600 hover:bg-gray-700 transition-colors duration-300">
                                        <Download className="mr-2 h-5 w-5" />
                                        Download
                                    </Button>
                                    <Share title={params.streamid} />
                                    <AddToBookmark 
                                        image={details?.coverImage} 
                                        animeId={params.animeid} 
                                        title={stream?.info?.title || "unknown"} 
                                        isStream={true} 
                                    />
                                    <Button variant="outline" className="border-gray-600 hover:bg-gray-700 transition-colors duration-300">
                                        <Flag className="mr-2 h-5 w-5" />
                                        Report
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {details.nextAiringEpisode && (
                        <Card className="bg-gray-800/30 backdrop-blur-lg border-0 shadow-xl">
                            <CardContent className="p-6">
                                <NextAiringEpisode 
                                    nextAiringEpisode={details.nextAiringEpisode.episode} 
                                    formattedAiringDate={formattedAiringDate} 
                                />
                            </CardContent>
                        </Card>
                    )}

                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 rounded-lg bg-gray-800/30 p-1">
                            <TabsTrigger value="info"><Info className="mr-2" />Info</TabsTrigger>
                            <TabsTrigger value="episodes"><List className="mr-2" />Episodes</TabsTrigger>
                            <TabsTrigger value="related"><Users className="mr-2" />Related</TabsTrigger>
                            <TabsTrigger value="comments"><MessageSquare className="mr-2" />Comments</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <Card className="mt-6 bg-gray-800/30 backdrop-blur-lg border-0 shadow-xl">
                                <CardContent className="p-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Synopsis</h3>
                                            <p className="text-gray-300 leading-relaxed">{details.description || "No synopsis available."}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Details</h3>
                                            <ul className="space-y-2 text-gray-300">
                                                <li><span className="font-semibold">Type:</span> {details.type || "Unknown"}</li>
                                                <li><span className="font-semibold">Episodes:</span> {details.episodes || "Unknown"}</li>
                                                <li><span className="font-semibold">Status:</span> {details.status || "Unknown"}</li>
                                                <li><span className="font-semibold">Aired:</span> {details.startDate ? `${details.startDate.year}-${details.startDate.month}-${details.startDate.day}` : "Unknown"}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Genres</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {details?.genres && details.genres.map((genre: string, index: number) => (
                                                <Link href={`/genres/${genre}`} key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600 transition-colors duration-300">
                                                    {genre}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="episodes">
                            <Suspense fallback={<EpisodeLoading />}>
                                <EpisodeLists 
                                    currentlyPlaying={stream?.info?.episode} 
                                    animeId={params.animeid} 
                                    isStream={true} 
                                    animeName={details?.title?.romaji || details?.title?.english || details?.title?.native || "Unknown"} 
                                />
                            </Suspense>
                        </TabsContent>
                        <TabsContent value="related">
                            <Suspense fallback={<RelationLoading />}>
                                <RelationCard bannerImage={details.coverImage} id={params.animeid} />
                            </Suspense>
                        </TabsContent>
                        <TabsContent value="comments">
                            <Suspense>
                                <CommentSection streamId={params.streamid} />
                            </Suspense>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-12">
                        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Recommended Anime</h2>
                        <Suspense fallback={<RecommendedLoading />}>
                            <RecommendedAnime episode={params.animeid} />
                        </Suspense>
                    </div>
                </section>
            ) : (
                notFound()
            )}
        </div>
    );
};

export default Page;