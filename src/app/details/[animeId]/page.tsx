import React, { Suspense } from "react";
import { Play } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import AddToBookmark from "@/components/buttons/AddToBookmark";
import ServerError from "@/components/error/ServerError";
import CharactersLoading from "@/components/loading/CharactersLoading";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import RelationLoading from "@/components/loading/RelationLoading";
import CharacterCard from "@/components/shared/cards/characterCard";
import EpisodeLists from "@/components/shared/cards/EpisodeLists";
import RelationCard from "@/components/shared/cards/RelationCard";
import { RecommendedAnime } from "@/components/shared/RecommendedAnime";
import { getAnimeDetails } from "@/lib/AnimeFetch";

type Props = {
    params: { animeId: number };
};

// function to generate metadata for details page dynamic og image is in todo
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const anime = await getAnimeDetails(params.animeId);
        if (anime && anime.title) {
            const title = anime.title.romaji || anime.title.english || anime.title.native || "Unknown";
            const words = title.toLowerCase().split(" ");
            const formattedTitle = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

            const description = anime.description;
            const formattedDescription = description?.replace(/<\/?[^>]+(>|$)/g, "");

            return {
                title: `${formattedTitle || "Opps!! No Title Found"} On AnimeTrix Watch Or Download For Free`,
                description: formattedDescription || "Opps!! No Description Found",
                openGraph: {
                    images: anime.cover || "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
                },
            };
        } else {
            throw new Error("Anime details are missing or incomplete");
        }
    } catch (error) {
        // Handle errors here, e.g., return an error response
        console.error("Error fetching anime details:", error);
        return {
            title: "Error",
            description: "Oops! An error occurred while fetching anime details.",
            openGraph: {
                images: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
        };
    }
}

/**
 * Renders the details page for a specific anime.
 * @param params - The parameters for the anime ID.
 * @returns The JSX element for the anime details page.
 */
export default async function page({ params }: { params: { animeId: number } }) {
    // Fetch the anime details using the provided ID.
    const details = await getAnimeDetails(params.animeId);

    // If the details are empty or the title is missing, render a server error component.
    if (Object.keys(details)?.length <= 0 || !details.title) {
        return <ServerError />;
    }

    /**
     * Returns the abbreviated month name for a given month number.
     * @param month - The month number (0-11).
     * @returns The abbreviated month name.
     */
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

    // Get the title of the anime and replace any hyphens with spaces.
    const title = details?.title?.romaji || details?.title?.english || details?.title?.native || "Unknown";
    const modifiedTitle = title.replace(/-/g, " ");

    // Render the anime details page.
    return (
        <section className="flex flex-col p-4 mt-4 overflow-hidden">
            <div className="flex md:flex-row flex-col gap-4 items-center flex-wrap">
                <img height={200} width={400} src={details.image} className=" w-48 lg:w-72 rounded-lg" alt={`an image of ${details.title.romaji || details.title.english || details.title.native}`} />
                <div className="flex flex-col gap-5 items-center md:items-start">
                    <h1 className="md:text-4xl lg:text-4xl text-2xl font-bold text-center md:text-left">{modifiedTitle}</h1>
                    {details.totalEpisodes !== null && <span className="font-semibold text-sm md:text-xl">Episodes : {details.totalEpisodes}</span>}
                    <div className="flex flex-wrap gap-5 font-semibold">
                        <span>{details?.startDate?.year}</span>
                        <span>{details?.type}</span>
                        <span>{details?.status}</span>
                        <span className="flex items-center gap-3">{details.rating && `${details.rating}%`}</span>
                    </div>
                    <div className="flex gap-5 flex-wrap justify-center lg:text-xl">
                        {details.episodes.length > 0 && (
                            <Link href={"#episodes"} className="bg-white  p-4 gap-3 rounded-lg  text-black font-semibold flex items-center duration-200 hover:scale-95">
                                <Play />
                                Watch Now
                            </Link>
                        )}
                        <AddToBookmark animeId={params.animeId} image={details.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} title={modifiedTitle} />
                    </div>

                    {details?.description && (
                        <div
                            className="max-w-4xl bg-white/10  border-2 border-white/30
                rounded-lg font-semibold p-2 lg:text-xl lg:max-h-48 max-h-40  overflow-scroll hiddenscroll"
                        >
                            <p dangerouslySetInnerHTML={{ __html: details?.description }}></p>
                        </div>
                    )}
                </div>
            </div>
            <div className=" mt-8 flex flex-col gap-5">
                {details.nextAiringEpisode !== undefined && (
                    <span className="bg-white text-md md:text-xl lg:w-2/6 text-black md:w-1/2 w-full  font-bold text-center p-3 rounded-lg">
                        Episode {details?.nextAiringEpisode?.episode} expected on {formattedAiringDate}
                    </span>
                )}
                <Suspense fallback={<EpisodeLoading />}>
                    <EpisodeLists animeId={params.animeId} />
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
