import { ChevronRight } from "lucide-react";
import Link from "next/link";

import AiringScheduleLoading from "@/components/loading/AiringScheduleLoading";
import CardSkeleton from "@/components/loading/CardSkeleton";

const loading = () => {
    return (
        <div className="p-4 flex flex-col pb-40 lg:pb-16">
            <div className=" w-full h-[calc(100vh-80vh)] 2xl:h-[550px] lg:h-[calc(100vh-65vh)] rounded-lg bg-white/60 animate-pulse"></div>
            <div className="flex flex-col mt-9">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl lg:text-5xl font-bold">Popular</h1>
                    <Link href={"/popular"} className=" flex gap-2 items-center font-extrabold text-sm md:text-xl">
                        Load more
                        <ChevronRight size={30} />
                    </Link>
                </div>
                <div className="flex gap-2">
                    <CardSkeleton />
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
                    <CardSkeleton />
                </div>
                <AiringScheduleLoading />
            </div>
        </div>
    );
};

export default loading;
