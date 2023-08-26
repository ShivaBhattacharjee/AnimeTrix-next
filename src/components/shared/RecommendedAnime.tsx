import React from 'react'
import Cards from './cards/Cards';
import ContentNotFound from '../error/Contentnotfound';
export async function RecommendedAnime({ episode }: { episode: number }) {
    const getAnimeDetails = async () => {
        try {
            const response = await fetch(`https://animetrix-api.vercel.app/meta/anilist/info/${episode}`);
            const data = await response.json();
            return data.recommendations;
        } catch (error) {
            console.error("Error fetching details:", error);
            return [];
        }
    };
    const details = await getAnimeDetails()
    return (
        <>
            {details.length > 0 ? (
                <>
                    <h1 className=' text-4xl font-semibold'>Recommended</h1>
                    <Cards props={details} /></>
            ) : (
                <ContentNotFound message='recommendations' />
            )}
        </>
    )
}

