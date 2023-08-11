import React, { Suspense } from 'react';
import axios from 'axios';
import UpcomingSeasonCard from './UpcomingSeasonCard';

interface Anime {
    id: number;
    image: string;
    title: {
        userPreferred?: string;
        english?: string;
        romaji?: string;
        native?: string;
    };
    countryOfOrigin: string;
    type: string;
    genres: string[];
}

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const getAnimeData = async (season: string): Promise<Anime[]> => {
    try {
        const response = await axios.get(`https://animetrix-api.vercel.app/meta/anilist/advanced-search?season=${season}&&year=${getCurrentYear()}`, {
            responseType: 'json'
        });

        return response.data.results;
    } catch (error) {
        console.error("Error fetching recent anime:", error);
        return [];
    }
};

export default async function UpcomingSeason() {
    const seasons = ['FALL', 'SUMMER', 'WINTER', 'SPRING'];
    const animeDataPromises = seasons.map(season => getAnimeData(season));
    const animeDataResults = await Promise.all(animeDataPromises);

    return (
        <div className='mt-6'>
            <h1 className='text-3xl lg:text-5xl pb-6'>Upcoming</h1>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4'>
                {seasons.map((season, index) => (
                    <UpcomingSeasonCard props={animeDataResults[index]} title={season.toLowerCase()} />
                ))}
            </div>
        </div>
    );
}
