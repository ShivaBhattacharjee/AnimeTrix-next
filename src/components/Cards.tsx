import React from 'react';
import Image from 'next/image';
interface Anime {
  image: string;
  id : number;
  title: {
    userPreferred?: string;
    english?: string;
    romaji?: string;
    native?: string;
  };
}

interface CardsProps {
  props: Anime[];
}

const Cards: React.FC<CardsProps> = ({ props }) => {
  return (
    <div className='flex flex-1 gap-3 overflow-x-auto mt-9 lg:grid
     lg:grid-cols-8 lg:overflow-x-hidden'>
      {props?.map((anime) => {
        return (
          <div className='flex flex-col gap-4  rounded-lg ' key={`${anime.id + 1}`}>
            <Image
              src={anime?.image}
              className='rounded-lg h-full duration-200 hover:scale-105 '
              alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime.title?.native}`}
              height={200}
              width={600}
            />
            <span className='truncate w-32 lg:w-44 p-2 text-sm md:text-xl pb-5 capitalize'>
              {anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime?.title?.native}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
