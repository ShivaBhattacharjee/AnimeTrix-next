import React, { Suspense } from 'react'
import Slider from '../components/shared/Slider'
import Link from "next/link"
import Cards from '@/components/shared/cards/Cards';
import AiringSchedule from '@/components/shared/airingschedule/AiringSchedule';
import AiringScheduleLoading from "@/components/loading/AiringScheduleLoading"
import UpcomingSeason from '@/components/shared/upcomingSeason/UpcomingSeason';
import { RandomAnimeCard } from "@/components/shared/RandomAnimeCard"
import { UpcomingSeasonLoading } from '@/components/loading/UpcomingSeasonLoading';
import RandomAnimeLoading from '@/components/loading/RandomAnimeLoading';
import { getTrendingAnime, getPopularAnime } from '@/lib/GetAnime';

export default async function page() {
  const Trending = await getTrendingAnime()
  const Popular = await getPopularAnime()

  return (
    <div className="p-4 pb-56 md:pb-28 text-xl font-semibold flex-1 h-screen">
      <Slider posts={Trending} />


      <div className='flex flex-col mt-9'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl lg:text-5xl font-bold'>Popular</h1>
          <Link href={"/popular"} className='text-sm lg:text-lg'>Load more</Link>
        </div>
        <div className='flex gap-2'>
          <Cards props={Popular} />
        </div>
      </div>


      <div className='flex flex-col mt-9'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl lg:text-5xl font-bold'>Trending</h1>
          <Link href={"/trending"} className='text-sm lg:text-lg'>Load more</Link>
        </div>
        <div className='flex gap-2'>
          <Cards props={Trending} />
        </div>
      </div>

      <Suspense fallback={<RandomAnimeLoading />}>
        <div className='flex flex-col mt-9'>
          <h1 className='text-3xl lg:text-5xl font-bold'>Random Anime</h1>
          <div className='flex gap-2'>
            <RandomAnimeCard />
          </div>
        </div>
      </Suspense>
      <Suspense fallback={<UpcomingSeasonLoading />}>
        <UpcomingSeason />
      </Suspense>

      <Suspense fallback={<AiringScheduleLoading />}>
        <AiringSchedule />
      </Suspense>
    </div>
  )
}
