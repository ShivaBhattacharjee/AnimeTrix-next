"use client";

import Link from "next/link";

import ReloadFunc from "../../error/ReloadFunc";

import Anime from "@/types/animetypes";

interface UpcomingSeasonCardProps {
    props: Anime[];
    title: string;
}

const UpcomingSeasonCard: React.FC<UpcomingSeasonCardProps> = ({ props, title }) => {
    return (
        <div className={`border-2 border-white/20  p-5 h-[700px] overflow-y-scroll overflow-hidden w-full rounded-lg`}>
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold capitalize">{title}</h1>
                {props?.length > 0 || props === undefined ? (
                    props?.map((anime) => {
                        return (
                            <Link href={`details/${anime.id}`} className={`flex border-b-2 border-white/25 gap-5 items-center`} key={anime.id + 1}>
                                <img src={anime?.image} loading="lazy" alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime?.title?.native}`} height={200} width={400} className="lg:w-32 w-28 duration-200 hover:scale-105 rounded-lg mb-3" />
                                <div className="flex gap-3 flex-col">
                                    <span className="text-lg">{anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime?.title?.native}</span>
                                    <div className="flex gap-3 text-sm">
                                        <span>{anime?.countryOfOrigin}</span>
                                        <span>{anime?.type}</span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {anime?.genres?.map((genre) => (
                                            <span className="text-sm flex gap-2 items-center" key={genre}>
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <ReloadFunc message="Error loading season" />
                )}
            </div>
        </div>
    );
};

export default UpcomingSeasonCard;
