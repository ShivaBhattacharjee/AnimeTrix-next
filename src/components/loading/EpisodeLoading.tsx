import { ArrowUpNarrowWide, RefreshCcw } from "lucide-react";

const EpisodeLoading = () => {
    return (
        <>
            <div className="flex justify-between items-center flex-wrap gap-6">
                <div className="flex items-center flex-wrap gap-5">
                    <div className="flex gap-3 items-center">
                        <h1 className="text-4xl font-semibold ">Episodes</h1>
                        <RefreshCcw className=" duration-200 animate-spin cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex gap-3 items-center">
                        <label htmlFor="check" className=" bg-gray-100 relative w-16 h-8  rounded-full">
                            <input type="checkbox" id="check" className=" sr-only peer" />
                            <span className=" w-2/5 cursor-pointer h-4/5 bg-black/30 absolute rounded-full left-1 top-1 peer-checked:bg-black peer-checked:left-11 transition-all duration-500"></span>
                        </label>
                        <span className=" text-xl font-semibold">Dub</span>
                    </div>
                    <div className="flex  gap-1">
                        <input type="number" placeholder="Search Episode No......" className="bg-transparent search border-2 w-52 border-white  p-2 mr-4 rounded-lg focus:outline-none mb-3" />
                        <ArrowUpNarrowWide size={30} className=" mt-2" />
                    </div>
                </div>
            </div>
            <div className="grid gap-4 max-h-80 hiddenscroll overflow-y-scroll grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div className="bg-white/20 duration-200 border-white/20  hover:border-2 hover:scale-90 rounded-lg flex flex-col gap-3" key={index}>
                        <div className=" h-32 2xl:h-40 bg-white/20  duration-200 animate-pulse rounded-lg"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EpisodeLoading;
