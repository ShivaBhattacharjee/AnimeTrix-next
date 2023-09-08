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

const AniScanSearchLayout: React.FC<{ searchResult: ApiResponse | null; setToggle: any }> = ({ searchResult, setToggle }) => {
    if (searchResult === null) {
        return null; // Or render an appropriate placeholder or loading indicator
    }

    return (
        <div className="text-white pb-32 md:pb-0">
            {searchResult.result.map((anime, index) => (
                <div key={index}>
                    <img src={anime.image} alt={anime.filename} />
                    <h1>Filename: {anime.filename}</h1>
                    <p>Episode: {anime.episode}</p>
                    {/* Add more details if needed */}
                </div>
            ))}
        </div>
    );
};

export default AniScanSearchLayout;
