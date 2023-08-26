import React from 'react';
import UpcomingSeasonCard from './UpcomingSeasonCard';
import Anime from '@/types/animetypes';
import AnimeApi from '@/lib/animeapi/animetrixapi';
const getCurrentYear = () => {
    return new Date().getFullYear();
};

const getAnimeData = async (season: string): Promise<Anime[]> => {
    try {
        const response = await fetch(`${AnimeApi}/advanced-search?season=${season}&&year=${getCurrentYear()}`);
        const data = await response.json();
        return data.results;
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
            <h1 className='lg:text-3xl opacity-60'>{getCurrentYear()}</h1>
            <h1 className='text-3xl lg:text-5xl pb-6'>Upcoming</h1>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4'>
                {seasons.map((season, index) => (
                    <UpcomingSeasonCard props={animeDataResults[index]} title={season.toLowerCase()} key={season} />
                ))}
            </div>
        </div>
    );
}
