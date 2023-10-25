import React from "react";

const EpisodeLoading = () => {
    return (
        <>
            <div className="flex justify-between items-center flex-wrap gap-6">
                <div className="flex items-center flex-wrap gap-5">
                    <h1 className="text-4xl font-semibold lg:mb-4">Episodes</h1>
                </div>
                <div className="flex items-center mb-4">
                    <input type="number" placeholder="Search Episodes......" className="bg-transparent border-2 w-full md:w-56 2xl:w-72 dark:border-white border-black p-2 mr-4 rounded-lg focus:outline-none" />
                </div>
            </div>
            <div className="grid gap-4 max-h-80 hiddenscroll overflow-y-scroll grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div className="dark:bg-white/20 bg-black/20 duration-200 dark:border-white/20 border-white/20 hover:border-2 hover:scale-90 rounded-lg flex flex-col gap-3" key={index}>
                        <div className=" h-32 2xl:h-40 dark:bg-white/20 bg-black/20 duration-200 animate-pulse rounded-lg"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EpisodeLoading;
