import React from "react";

interface Anime {
    filename: string;
    episode: number;
    from: number;
    image: string;
}

interface ApiResponse {
    frameCount: number;
    error: string;
    result: Anime[];
}

const AniScanSearchLayout: React.FC<{ searchResult: ApiResponse | null; setToggle: (value: boolean) => void }> = ({ searchResult, setToggle }) => {
    if (searchResult === null) {
        return null; // Or render an appropriate placeholder or loading indicator
    }

    return (
        <div className="text-white grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 m-auto gap-5 p-4 pb-32 md:pb-0">
            {searchResult.result.map((anime, index) => (
                <div key={index} className="flex flex-col rounded-lg justify-center items-center bg-white/20">
                    <img src={anime.image} alt={anime.filename} />
                    <div className=" p-4">
                        <h1>Filename: {anime.filename}</h1>
                        <p>Episode: {anime.episode}</p>
                    </div>
                    {/* Add more details if needed */}
                </div>
            ))}
        </div>
    );
};

export default AniScanSearchLayout;
