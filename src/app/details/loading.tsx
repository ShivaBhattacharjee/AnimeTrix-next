import CharactersLoading from "@/components/loading/CharactersLoading";
import EpisodeLoading from "@/components/loading/EpisodeLoading";
import RecommendedLoading from "@/components/loading/RecommendedLoading";
import RelationLoading from "@/components/loading/RelationLoading";

const loading = () => {
    return (
        <section className="flex flex-col p-4 mt-4 overflow-hidden pb-40">
            <div className="flex md:flex-row flex-col gap-4 items-center flex-wrap">
                <div className=" bg-white/40  animate-pulse duration-200 h-72 w-52 md:h-80 md:w-60 rounded-lg"></div>
                <div className="flex flex-col gap-5 items-center md:items-start">
                    <h1 className=" bg-white/40  animate-pulse duration-200 w-72 md:w-[400px] h-10"></h1>
                    <span className=" bg-white/40 animate-pulse duration-200 w-72 md:w-80 h-6"></span>
                    <div className="flex flex-wrap gap-5 font-semibold">
                        {[1, 2, 3].map((index) => (
                            <span key={index} className=" bg-white/40 animate-pulse duration-200 h-5 w-14 md:w-20"></span>
                        ))}
                    </div>

                    <div className="flex gap-5 flex-wrap justify-center lg:text-xl">
                        {[1, 2].map((index) => (
                            <button key={index} className="bg-white/40 animate-pulse duration-200 p-4 gap-3 rounded-lg text-black font-semibold flex items-center  hover:scale-95 w-32 h-12"></button>
                        ))}
                    </div>

                    <div
                        className=" w-72 md:w-96 bg-white/40  border-2 border-white/30
                rounded-lg font-semibold p-2 h-20 hiddenscroll animate-pulse duration-200 overflow-hidden"
                    ></div>
                </div>
            </div>
            <div className="mt-7 flex flex-col gap-5">
                <EpisodeLoading />
            </div>
            <div className="mt-7 flex flex-col gap-5">
                <RelationLoading />
            </div>
            <div className="mt-7 flex flex-col gap-5">
                <CharactersLoading />
            </div>
            <div className="mt-7 flex flex-col gap-5">
                <RecommendedLoading />
            </div>
        </section>
    );
};

export default loading;
