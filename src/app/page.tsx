import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import Slider from "../components/shared/Slider";

import AiringScheduleLoading from "@/components/loading/AiringScheduleLoading";
import { UpcomingSeasonLoading } from "@/components/loading/UpcomingSeasonLoading";
import AiringSchedule from "@/components/shared/airingschedule/AiringSchedule";
import Cards from "@/components/shared/cards/Cards";
import UpcomingSeason from "@/components/shared/upcomingSeason/UpcomingSeason";
import { getPopularAnime, getTrendingAnime } from "@/lib/AnimeFetch";

export function generateMetadata() {
    return {
        title: "Animetrix - Your Premier Source for Free Anime Downloads and Streaming",
        description: "Discover the ultimate anime experience at Animetrix! Enjoy free anime downloads and streaming of the latest series and timeless classics. Dive into our vast collection now!",
        openGraph: {
            images: "https://cdn.discordapp.com/attachments/1079039236302446705/1166676085883285544/animetrixbanner.jpg?ex=654b5ac6&is=6538e5c6&hm=6d9c8c991b0897a33364a58aeea177e53c26216c617b6dff9b5de7607b9bf332&",
        },
    };
}
export default async function page() {
    const Trending = await getTrendingAnime();
    const Popular = await getPopularAnime();

    return (
        <div className="p-4  md:pb-28 text-xl font-semibold flex-1 h-screen">
            <Slider Trending={Trending} />

            <div className="flex flex-col mt-9">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl lg:text-5xl font-bold">Popular</h1>
                    <Link href={"/popular"} className=" flex items-center gap-2 font-extrabold text-sm md:text-xl">
                        Load more
                        <ChevronRight size={30} />
                    </Link>
                </div>
                <div className="flex gap-2">
                    <Cards props={Popular} />
                </div>
            </div>

            <div className="flex flex-col mt-9">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl lg:text-5xl font-bold">Trending</h1>
                    <Link href={"/trending"} className=" flex gap-2 items-center font-extrabold text-sm md:text-xl">
                        Load more
                        <ChevronRight size={30} />
                    </Link>
                </div>
                <div className="flex gap-2">
                    <Cards props={Trending} />
                </div>
            </div>

            <Suspense fallback={<UpcomingSeasonLoading />}>
                <UpcomingSeason />
            </Suspense>

            <Suspense fallback={<AiringScheduleLoading />}>
                <AiringSchedule />
            </Suspense>
        </div>
    );
}
