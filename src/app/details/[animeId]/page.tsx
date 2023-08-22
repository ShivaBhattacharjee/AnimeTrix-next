
import ServerError from '@/components/error/ServerError';
import RelationCard from '@/components/shared/RelationCard'
import React, { Suspense } from 'react'
import { FileX, Play, Bookmark } from 'lucide-react';
import { Metadata } from 'next'
import SpinLoading from '@/components/loading/SpinLoading';
import EpisodeLists from '@/components/shared/EpisodeLists';
export default async function page({ params }: {
  params:
  { animeId: number }
}) {
  const getAnimeDetails = async () => {
    try {
      const response = await fetch(`https://animetrix-api.vercel.app/meta/anilist/info/${params.animeId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching details:", error);
      return [];
    }
  };
  const details = await getAnimeDetails()

  if (Object.keys(details).length === 0 || !details.title) {
    return (
      <ServerError />
    );
  }
  return (
    <section className='flex flex-col p-4 mt-4 overflow-hidden pb-40'>
      <div className="flex md:flex-row flex-col gap-4 items-center flex-wrap">
        <img height={200} width={400} src={details.image} className=' w-48 lg:w-72 rounded-lg' alt={`an image of ${details.title.romaji || details.title.english || details.title.native}`} />
        <div className="flex flex-col gap-5 items-center md:items-start">
          <h1 className='md:text-4xl lg:text-5xl text-2xl font-bold text-center md:text-left'>
            {details.title.romaji || details.title.english || details.title.native}
          </h1>
          {details.totalEpisodes !== null && (
            <span className='font-semibold text-sm md:text-xl'>Episodes : {details.totalEpisodes}</span>
          )}
          <div className="flex flex-wrap gap-5 font-semibold">
            <span>{details?.startDate?.year}</span>
            <span>{details?.type}</span>
            <span>{details?.status}</span>
            <span className='flex items-center gap-3'>{details.rating && (`${details.rating}%`)}</span>
          </div>
          <div className="flex gap-5 flex-wrap justify-center lg:text-xl">
            <button className='bg-white p-4 gap-3 rounded-lg text-black font-semibold flex items-center duration-200 hover:scale-95'>
              <Play />Watch Now
            </button>
            <button className='flex p-4 border-2 items-center gap-3 font-semibold border-white rounded-lg duration-200 hover:scale-95'>
              <Bookmark />Bookmark</button>
          </div>
          {
            details?.description && (
              <div className='max-w-4xl bg-white/10 border-2 border-white/30  
                rounded-lg font-semibold p-2 lg:text-xl lg:max-h-48 max-h-40  overflow-scroll'>
                <p dangerouslySetInnerHTML={{ __html: details?.description }}></p>
              </div>
            )
          }
        </div>
      </div>
      <div className='mt-7 flex flex-col gap-5'>
        <Suspense fallback={<div className='flex mt-5 justify-center items-center'>
          <SpinLoading />
        </div>}>
          <EpisodeLists listData={details.episodes} />
        </Suspense>
      </div>
      <div className='mt-7 flex flex-col gap-5'>
        <Suspense fallback={<div className='flex mt-5 justify-center items-center'>
          <SpinLoading />
        </div>}>
          <RelationCard id={params.animeId} />
        </Suspense>
      </div>
    </section>
  );
}
export const metadata: Metadata = {
  title: 'This is details page',
  description: 'idk man will decide later',
}