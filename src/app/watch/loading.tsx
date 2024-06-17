import { Download, Flag, Share2 } from "lucide-react";

import CharactersLoading from "@/components/loading/CharactersLoading";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import RelationLoading from "@/components/loading/RelationLoading";

const loading = () => {
    return (
        <section className="p-2 min-h-screen">
            <div className=" w-full">
                <div className=" flex justify-between lg:flex-row flex-col gap-5">
                    <div className="flex flex-col w-full 2xl:w-[70vw]">
                        <div className="w-full duration-200 animate-pulse bg-white/25  rounded-lg h-[30vh] lg:h-[50vh] md:h-[30vh]"></div>
                        <div className="mt-2">
                            <h1 className="font-semibold text-2xl lg:text-4xl bg-white/25  h-10 w-full animate-pulse"></h1>
                            <h1 className="font-semibold text-2xl lg:text-4xl bg-white/25  mt-5 h-7 w-1/2 animate-pulse"></h1>
                        </div>
                        <div className="flex gap-3 mt-6 flex-wrap items-center">
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className=" bg-white  p-2 rounded-lg font-semibold text-black  flex items-center gap-3" rel="noopener noreferrer">
                                <Download />
                                Download
                            </a>
                            <a href="https://www.youtube.com/watch?v=273eSvOwpKk" target="_blank" className="bg-white  p-2 rounded-lg font-semibold text-black  flex items-center gap-3">
                                <Share2 />
                                Share
                            </a>
                            <a href="https://github.com/ShivaBhattacharjee/AnimeTrix-next/issues" target="_blank" className="bg-white  p-2 rounded-lg font-semibold text-black  flex gap-3 items-center">
                                <Flag />
                                Report
                            </a>
                        </div>

                        <div className="flex gap-3 mt-7 w-full">
                            <div className=" bg-white/25  animate-pulse duration-200 h-[200px] w-[260px] lg:h-[240px] rounded-lg" />
                            <div className="flex flex-wrap w-full gap-3 text-lg flex-col font-semibold">
                                <h1 className=" w-full lg:w-1/2 h-8 lg:h-11 bg-white/25 animate-pulse duration-200"> </h1>
                                <h1 className=" w-full lg:w-1/2 h-8 lg:h-11 bg-white/25  animate-pulse duration-200"> </h1>
                                <h1 className=" w-full lg:w-1/2 h-8 lg:h-11 bg-white/25  animate-pulse duration-200"> </h1>
                                <h1 className=" w-full lg:w-1/2 h-8 lg:h-11 bg-white/25  animate-pulse duration-200"> </h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-5 text-lg font-semibold">
                            {[1, 2, 3, 4, 5].map((index: number) => (
                                <button className="border-2 text-sm lg:text-lg border-white  w-24 h-11 bg-white/25  duration-200 animate-pulse border-dotted rounded-lg p-2" key={index}></button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-3 xl:w-[80vw]">
                        <EpisodeLoading />
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <RelationLoading />
            </div>
            <div className="mt-6">
                <CharactersLoading />
            </div>
            <div className="mt-12">
                <RecommendedLoading />
            </div>
        </section>
    );
};

export default loading;
