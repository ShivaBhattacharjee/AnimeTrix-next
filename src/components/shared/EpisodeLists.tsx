import React from 'react';
import { Frown } from "lucide-react";

interface Anime {
  image: string;
  number: number;
  title: string;
}

interface EpisodeListsProps {
  listData: Anime[];
}

const EpisodeLists: React.FC<EpisodeListsProps> = ({ listData }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className=' text-4xl font-semibold'>Episodes</h1>

      </div>
      {listData.length > 0 ? (
        <div className='grid gap-4 max-h-64 overflow-y-scroll grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
          {listData
            .slice(0, 100)
            .sort((animeA, animeB) => animeA.number - animeB.number)
            .map((anime, index) => (
              <div className='bg-white/20 duration-200 border-white/20 hover:border-2 hover:scale-90 rounded-lg flex flex-col gap-3' key={index}>
                <img src={anime.image} alt={`an image of ${anime.title}`} loading='lazy' className='rounded-t-lg 
                  border-b-2 border-white/30  cursor-pointer bg-cover' height={200} width={400} />
                <h1 className='text-center font-semibold mb-3'>Episode: {anime.number}</h1>
              </div>
            ))}
        </div>
      ) : (
        <div className='flex capitalize items-center justify-center text-3xl font-semibold  gap-3'>
          <Frown />
          <h1>Coming Soon!!</h1>
        </div>
      )}
    </>
  );
};

export default EpisodeLists;
