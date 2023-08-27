import React from "react";

const EpisodeLoading = () => {
    return (
        <>
            <div className="flex justify-between items-center flex-wrap gap-6">
                <div className="flex items-center flex-wrap gap-5">
                    <h1 className="text-4xl font-semibold">Episodes</h1>
                </div>
                <div className="flex items-center">
                    <input type="number" placeholder="Search Episodes......" className="bg-transparent border-2 w-full md:w-56 2xl:w-72 border-white p-2 mr-4 rounded-lg focus:outline-none" />
                </div>
            </div>
            <div className="grid gap-4 max-h-64 overflow-y-scroll grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div className="bg-white/20 duration-200 border-white/20 hover:border-2 hover:scale-90 rounded-lg flex flex-col gap-3" key={index}>
                        <div className=" h-32 2xl:h-40 bg-white/20 duration-200 animate-pulse rounded-lg"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EpisodeLoading;
