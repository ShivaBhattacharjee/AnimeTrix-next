"use client";

import SpinLoading from "./SpinLoading";

const AiringScheduleLoading = () => {
    return (
        <div className="flex flex-col mt-9">
            <h1 className="text-3xl lg:text-5xl font-bold">Airing Schedule</h1>
            <div className="flex gap-2">
                <div className={`border-white/25 border-2 flex justify-center items-center animate-pulse h-52 w-full p-4 rounded-lg mt-5 lg:h-96 overflow-y-auto`}>
                    <SpinLoading />
                </div>
            </div>
        </div>
    );
};

export default AiringScheduleLoading;
