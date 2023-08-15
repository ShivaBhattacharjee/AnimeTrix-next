import Image from 'next/image';
import ServerError from '@/components/error/ServerError';
import React from 'react'
import { FileX, Play, Plus } from 'lucide-react';
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
    <section className='flex flex-col p-4 mt-4 overflow-hidden'>
      <div className="flex md:flex-row flex-col gap-4 items-center flex-wrap">
        <Image height={200} width={400} src={details.image} className=' w-48 lg:w-72 rounded-lg' alt="an image" />
        <div className="flex flex-col gap-5 items-center md:items-start">
          <h1 className='md:text-4xl lg:text-5xl text-2xl font-bold text-center md:text-left'>{details.title.english}</h1>
          <div className="flex flex-wrap gap-5 font-semibold">
            <span>{details?.startDate?.year}</span>
            <span>{details?.type}</span>
            <span>{details?.status}</span>
            <span className='flex items-center gap-3'>{details.rating&&(`${details.rating}%`)}</span>
          </div>
          <div className="flex gap-5 flex-wrap justify-center lg:text-xl">
            <button className='bg-white p-4 gap-3  rounded-lg text-black font-semibold flex items-center duration-200 hover:scale-95'>
              <Play />Watch Now</button>
            <button className='flex p-4 border-2 items-center gap-3 font-semibold border-white rounded-lg duration-200 hover:scale-95'>
              <Plus /> Bookmark</button>
          </div>
        </div>
      </div>
    </section>
  );

}