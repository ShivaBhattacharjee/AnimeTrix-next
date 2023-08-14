import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Anime {
  image: string;
  id: number;
  title: {
    userPreferred?: string;
    english?: string;
    romaji?: string;
    native?: string;
  };
  status: string;
  totalEpisodes : number
}

interface VerticalCardsProps {
  title: string;
  data: Anime[];
}

const VerticalCards: React.FC<VerticalCardsProps> = ({ title, data }) => {
  return (
    <div className='p-4 pb-40 lg:pb-16 md:m-auto'>
      <h1 className='text-3xl lg:text-5xl font-bold'>{title}</h1>
      <div
        className='grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6 items-center lg:p-5 mt-8 overflow-hidden'
      >
        {data.map((anime) => {
          return (
            <div key={anime.id} className=' border-2 border-white/30 card-img rounded-lg'> {/* Add a unique key for each mapped element */}
              <Link href={`/details/${anime.id}`} className='content-normal overflow-hidden w-full h-full'>
                <div className='md:w-48 md:h-64 h-64 w-50 relative overflow-hidden'>
                  <Image
                    src={anime?.image}
                    alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime.title?.native}`}
                    layout='fill'
                    className=' rounded-t-lg hover:scale-105 duration-200'
                    objectFit='cover'
                    draggable={false}
                  />
                </div>
                <div className="flex flex-col gap-3 p-2">
                <span className='truncate w-32 lg:w-44 text-sm md:text-xl lg:text-lg capitalize'>{anime.title.english || anime.title.romaji || anime.title.native}</span>
                  {
                    anime?.totalEpisodes !== null && anime?.totalEpisodes !== undefined && (
                      <div className='truncate w-32 lg:w-44 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center'>
                        {anime?.status === "Ongoing" && (
                          <div className="green w-2 lg:w-3 h-2 lg:h-3  rounded-full bg-green-500"></div>
                        )}
                        <span> Ep: {anime?.totalEpisodes}</span>
                      </div>
                    )
                  }
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalCards;
