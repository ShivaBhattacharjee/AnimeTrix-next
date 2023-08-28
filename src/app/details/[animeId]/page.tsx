import ServerError from "@/components/error/ServerError";
import RelationCard from "@/components/shared/cards/RelationCard";
import React, { Suspense } from "react";
import { Play, Bookmark } from "lucide-react";
import { Metadata } from "next";
import EpisodeLists from "@/components/shared/cards/EpisodeLists";
import CharacterCard from "@/components/shared/cards/characterCard";
import { RecommendedAnime } from "@/components/shared/RecommendedAnime";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RelationLoading from "@/components/loading/RelationLoading";
import CharactersLoading from "@/components/loading/CharactersLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import { getAnimeDetails } from "@/lib/AnimeFetch";
import Link from "next/link";
export default async function page({ params }: { params: { animeId: number } }) {
    const details = await getAnimeDetails(params.animeId);

    if (Object.keys(details).length === 0 || !details.title) {
        return <ServerError />;
    }

    const getAbbreviatedMonth = (month: number): string => {
        const abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return abbreviatedMonths[month];
    };

    const options: Intl.DateTimeFormatOptions = {
        year: undefined,
        month: "numeric",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const airingDate = new Date(details.nextAiringEpisode?.airingTime * 1000);
    const formattedAiringDate = airingDate.toLocaleString(undefined, options);
    const monthIndex = airingDate.getMonth();
    const day = airingDate.getDate();
    const time = formattedAiringDate.split(", ")[1];

    const finalFormat = `${getAbbreviatedMonth(monthIndex)}/${day}, ${time}`;
    const title = details.title.romaji || details.title.english || details.title.native;
    const modifiedTitle = title.replace(/-/g, " ");

    return (
        <section className="flex flex-col p-4 mt-4 overflow-hidden pb-40">
            <div className="flex md:flex-row flex-col gap-4 items-center flex-wrap">
                <img height={200} width={400} src={details.image} className=" w-48 lg:w-72 rounded-lg" alt={`an image of ${details.title.romaji || details.title.english || details.title.native}`} />
                <div className="flex flex-col gap-5 items-center md:items-start">
                    <h1 className="md:text-4xl lg:text-5xl text-2xl font-bold text-center md:text-left">{modifiedTitle}</h1>
                    {details.totalEpisodes !== null && <span className="font-semibold text-sm md:text-xl">Episodes : {details.totalEpisodes}</span>}
                    <div className="flex flex-wrap gap-5 font-semibold">
                        <span>{details?.startDate?.year}</span>
                        <span>{details?.type}</span>
                        <span>{details?.status}</span>
                        <span className="flex items-center gap-3">{details.rating && `${details.rating}%`}</span>
                    </div>
                    <div className="flex gap-5 flex-wrap justify-center lg:text-xl">
                        {details.episodes.length > 0 && (
                            <Link href={`#episodes`} className="bg-white p-4 gap-3 rounded-lg text-black font-semibold flex items-center duration-200 hover:scale-95">
                                <Play />
                                Watch Now
                            </Link>
                        )}
                        <button className="flex p-4 border-2 items-center gap-3 font-semibold border-white rounded-lg duration-200 hover:scale-95">
                            <Bookmark />
                            Bookmark
                        </button>
                    </div>

                    {details?.description && (
                        <div
                            className="max-w-4xl bg-white/10 border-2 border-white/30  
                rounded-lg font-semibold p-2 lg:text-xl lg:max-h-48 max-h-40  overflow-scroll"
                        >
                            <p dangerouslySetInnerHTML={{ __html: details?.description }}></p>
                        </div>
                    )}
                </div>
            </div>
            <div className=" mt-8 flex flex-col gap-5">
                <Suspense fallback={<EpisodeLoading />}>
                    {details.nextAiringEpisode !== undefined && (
                        <span className="bg-white text-xl text-black md:w-1/2 w-full   font-bold text-center p-3 rounded-lg">
                            Episode {details?.nextAiringEpisode?.episode} will air in {finalFormat}
                        </span>
                    )}
                    <EpisodeLists listData={details.episodes} animeId={params.animeId} />
                </Suspense>
            </div>
            <div className="mt-7 flex flex-col gap-5">
                <Suspense fallback={<RelationLoading />}>
                    <RelationCard id={params.animeId} />
                </Suspense>
            </div>

            <div className="mt-7 flex flex-col gap-5">
                <Suspense fallback={<CharactersLoading />}>
                    <CharacterCard characters={details.characters} />
                </Suspense>
            </div>

            <div className="mt-7 flex flex-col gap-5">
                <Suspense fallback={<RecommendedLoading />}>
                    <RecommendedAnime episode={params.animeId} />
                </Suspense>
            </div>
        </section>
    );
}
export const metadata: Metadata = {
    title: "This is details page",
    description: "idk man will decide later",
};
