import { Suspense } from "react";
import { Download, Flag } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToBookmark from "@/components/buttons/AddToBookmark";
import Share from "@/components/buttons/Share";
import CommentSection from "@/components/CommentSection";
import ServerError from "@/components/error/ServerError";
// import CharactersLoading from "@/components/loading/CharactersLoading";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import RelationLoading from "@/components/loading/RelationLoading";
import NextAiringEpisode from "@/components/NextAiringEpisode";
// import CharacterCard from "@/components/shared/cards/characterCard";
import EpisodeLists from "@/components/shared/cards/EpisodeLists";
import RelationCard from "@/components/shared/cards/RelationCard";
import { RecommendedAnime } from "@/components/shared/RecommendedAnime";
import AddToHistory from "@/lib/addToHistory";
import { getAnimeDetails, getDownloadLink, getSteamingLink } from "@/lib/AnimeFetch";

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
const Page = async ({
    params,
}: {
    params: {
        streamid: string;
        animeid: number;
    };
}) => {
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
        <>
            {Object.keys(details || stream).length > 0 ? (
                <section className="p-2 min-h-screen">
                    <Suspense fallback={<></>}>
                        <AddToHistory streamId={params.streamid} animeId={params.animeid} title={stream?.info?.title || "unknown"} episode={stream?.info?.episode || "unknown"} coverImage={details?.bannerImage || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} image={details?.coverImage || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} />
                    </Suspense>
                    <div className=" w-full">
                        <div className=" flex justify-between lg:flex-row flex-col gap-5">
                            <div className="flex flex-col w-full 2xl:w-[70vw]">
                                <iframe src={stream?.plyr?.main || stream?.plyr?.backup} scrolling="no" frameBorder="0" allowFullScreen={true} title={params.streamid} allow="picture-in-picture" className="w-full rounded-lg h-[30vh] lg:h-[50vh] md:h-[30vh]"></iframe>
                                <div className="mt-2">
                                    <h1 className="font-semibold text-2xl lg:text-4xl text-white">{stream?.info?.title || "unknown"}</h1>
                                    <span className="text-lg mt-4 lg:text-2xl font-semibold text-white/70">Episode : {stream?.info?.episode || "unknown"}</span>
                                </div>

                                <div className="flex gap-3 mt-6 flex-wrap items-center">
                                    <a href={download?.download || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank" className=" bg-white  p-2 rounded-lg font-semibold text-black  flex items-center gap-3" rel="noopener noreferrer">
                                        <Download />
                                        Download
                                    </a>
                                    <Share title={params.streamid} />
                                    <a href="https://github.com/ShivaBhattacharjee/AnimeTrix-next/issues" target="_blank" className=" bg-white  p-2 rounded-lg font-semibold text-black  flex gap-3 items-center">
                                        <Flag />
                                        Report
                                    </a>
                                </div>
                                {details.nextAiringEpisode !== undefined && <NextAiringEpisode nextAiringEpisode={details?.nextAiringEpisode?.episode} formattedAiringDate={formattedAiringDate} />}

                                <div className="flex gap-3 w-full mt-5">
                                    <img src={details?.coverImage} alt={`an image of ${params?.streamid}`} className=" w-40 md:w-44 rounded-lg" />
                                    <div className="flex flex-wrap w-full gap-3 text-md md:text-lg flex-col font-semibold">
                                        <h1>
                                            <span className=" text-white/70">Name: </span>
                                            {stream?.info?.title || "Unknown"}
                                        </h1>
                                        <h1>
                                            <span className=" text-white/70">Episode: </span>
                                            {stream?.info?.episode || "Unknown"}
                                        </h1>
                                        <h1>
                                            <span className=" text-white/70">Type</span> : {details?.type || "Unknown"}
                                        </h1>
                                        <h1>
                                            <span className=" text-white/70">Country</span> : {details?.countryOfOrigin || "Earth"}
                                        </h1>
                                    </div>
                                    <AddToBookmark image={details?.coverImage} animeId={params.animeid} title={stream?.info?.title || "unknown"} isStream={true} />
                                </div>

                                <div className="flex flex-wrap gap-4 mt-5 text-lg font-semibold">
                                    {details?.genres &&
                                        Object?.keys(details?.genres).length > 0 &&
                                        details.genres.map((genre: string, index: number) => (
                                            <Link href={`/genres/${genre}`} className="border-2 text-sm lg:text-lg border-white  border-dotted rounded-lg p-2 duration-200 hover:border-solid" key={index}>
                                                {genre}
                                            </Link>
                                        ))}
                                </div>
                            </div>
                            <div className="mt-3">
                                <Suspense fallback={<EpisodeLoading />}>
                                    <EpisodeLists currentlyPlaying={stream?.info?.episode} animeId={params.animeid} isStream={true} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <Suspense>
                        <CommentSection streamId={params.streamid} />
                    </Suspense>
                    <div className="mt-7 flex flex-col gap-5">
                        <Suspense fallback={<RelationLoading />}>
                            <RelationCard bannerImage={details.coverImage} id={params.animeid} />
                        </Suspense>
                    </div>
                    {/* <div className="mt-6">
                        <Suspense fallback={<CharactersLoading />}>
                            <CharacterCard characters={details.characters} />
                        </Suspense>
                    </div> */}
                    <div className="mt-12">
                        <Suspense fallback={<RecommendedLoading />}>
                            <RecommendedAnime episode={params.animeid} />
                        </Suspense>
                    </div>
                </section>
            ) : (
                notFound()
            )}
        </>
    );
};

export default Page;
