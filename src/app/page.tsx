import React from 'react'
import Slider from '../components/Slider'
import Link from 'next/link'
const page = ({ animeList }) => {
  return (
    <div className="p-4 pb-40 md:pb-10 text-xl mt-24 font-semibold flex-1 h-screen">
      <Slider animeList={animeList}  />

      <div className='flex flex-col mt-9'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl lg:text-5xl font-bold'>Recent</h1>
          <Link href={"/recent-anime"}>Load more</Link>
        </div>
        <div className='flex mt-9 gap-7 overflow-x-scroll'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-5fa4ZBbW4dqA.jpg" className='rounded-lg  w-40 lg:w-52' alt="" />
            ))
          }
        </div>
      </div>


      <div className='flex flex-col mt-9 md:pb-10'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl lg:text-5xl font-bold'>Popular</h1>
          <Link href={"/popular-anime"}>Load more</Link>
        </div>
        <div className='flex mt-9 gap-7 overflow-x-scroll'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-5fa4ZBbW4dqA.jpg" className='rounded-lg  w-40 lg:w-52' alt="" />
            ))
          }
        </div>
      </div>

      <div className='flex flex-col mt-9  md:pb-10'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl lg:text-5xl font-bold'>Recommended</h1>
        </div>
        <div className='flex mt-9 gap-7 overflow-x-scroll'>
          {
            [1].map(() => (
              <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-5fa4ZBbW4dqA.jpg" className='rounded-lg  w-40 lg:w-52' alt="" />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default page