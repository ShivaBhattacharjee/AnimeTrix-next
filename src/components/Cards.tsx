import React from 'react';

interface Anime {
  image: string;
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
    <div className='flex gap-4 overflow-x-auto mt-9 lg:grid lg:grid-cols-7 lg:overflow-x-hidden'>
      {props.map((anime) => {
        return (
          <div className='flex flex-col gap-2' key={anime.title.userPreferred || anime.title.english || anime.title.romaji || anime.title.native}>
            <img
              src={anime.image}
              className='rounded-lg aspect-auto w-[400px] bg-cover'
              alt="this is an image"
            />
            <span className='truncate w-32 text-lg text-center m-auto flex gap-0 items-center'>
              {anime.title.userPreferred || anime.title.english || anime.title.romaji || anime.title.native}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
