import Image from 'next/image';
import ServerError from '@/components/error/ServerError';
import React from 'react'
import { Play, Plus } from 'lucide-react';
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
    <section className='h-screen p-5 overflow-hidden'>
      <div className='flex flex-col md:flex-row items-center gap-5 flex-wrap'>
        <Image height={200} width={400} src={details.image} className=' w-52 lg:w-72 rounded-lg' alt="" />
        <div className="flex flex-col items-center md:items-start gap-4 font-semibold">
          <h1 className='lg:text-4xl text-2xl font-semibold text-center md:text-left'>{details?.title?.romaji || details?.title?.english || details?.title?.native}</h1>
          <div className="flex flex-wrap gap-5">
            <span>{details?.duration != null ? `${details?.duration}min` : null}</span>
            <span>{details?.type}</span>
            <span>{details?.status}</span>
          </div>
          <div className="flex justify-evenly flex-wrap items-center  gap-5">
            <button className='p-4 flex items-center gap-3 bg-white text-black
         rounded-lg font-semibold hover:scale-90 duration-200 ease-in-out'><Play />Watch Now</button>
            <button className='p-4 flex items-center gap-3 text-white border-2 border-white
         rounded-lg font-semibold hover:scale-90 duration-200 ease-in-out'><Plus />Bookmark</button>
          </div>

   
        </div>
      </div>
    </section>
  );

}