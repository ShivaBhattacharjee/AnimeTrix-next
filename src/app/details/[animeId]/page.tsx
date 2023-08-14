import Image from 'next/image';
import ServerError from '@/components/error/ServerError';
import React from 'react'
import WrongUrl from '@/components/error/WrongUrl';

export default async function page({ params }: {
  params:
  { animeId: number }
}) {
  const getAnimeDetails = async () => {
    try {
      const response = await fetch(`https://animetrix-api.vercel.app/meta/anilist/info/${params.animeId}`);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching details:", error);
      return [];
    }
  };
  const details = await getAnimeDetails()

  if (!details) {
    return (
      <ServerError />
    );
  } else if (!details.title) {
    return (
      <WrongUrl/>
    );
  }

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <h1 className='text-4xl text-center font-bold'>
        {details?.title?.english  ||details?.title?.native || details?.title?.romaji }
      </h1>
    </div>
  )
}