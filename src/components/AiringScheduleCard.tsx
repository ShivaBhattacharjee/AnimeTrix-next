"use client"
import React, { useState } from 'react';
import { FastForward, Rewind,PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface Anime {
    id: string;
    airingAt: number;
    image: string;
    title?: {
        userPreferred: string;
        english : string;
        romaji : string;
        native : string
    };
    episode: number;
}

interface AiringScheduleCardProps {
    airingData: {
        results: Anime[];
    };
}

const AiringScheduleCard: React.FC<AiringScheduleCardProps> = ({ airingData }) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());

    const handlePreviousDay = () => {
        setCurrentDayIndex((prevIndex) => (prevIndex === 0 ? 6 : prevIndex - 1));
    };

    const handleNextDay = () => {
        setCurrentDayIndex((prevIndex) => (prevIndex === 6 ? 0 : prevIndex + 1));
    };

    const currentDay = daysOfWeek[currentDayIndex];

    const animeForCurrentDay = airingData.results.filter((anime) => {
        const airingDate = new Date(anime.airingAt * 1000);
        return airingDate.getDay() === currentDayIndex;
    });

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPM}`;
    };

    return (
        <div className='flex gap-2'>
            <div className="bg-white/10 h-auto max-h-[400px] lg:max-h-[600px] w-full  rounded-lg mt-5 overflow-y-auto">
                <div className="flex flex-col gap-3">
                    <div className='p-4'>
                        <div className='flex flex-col gap-3'>
                            {animeForCurrentDay.length === 0 ? (
                                <div className='text-white text-center'>Opps !! No schedule found for {currentDay}.</div>
                            ) : (
                                animeForCurrentDay.map((anime) => (
                                    <div className='flex justify-between items-center'>
                                        <div key={anime.id} className='flex items-center gap-4'>
                                            <Image height={200} width={400}
                                                src={anime.image} alt={"anime image"}
                                                className=' w-24 object-cover rounded-lg' />
                                            <div className='flex flex-col'>
                                                <span className='text-white text-sm w-24 truncate mb-3
                                                lg:text-xl lg:w-full '>{anime.title?.userPreferred || anime.title?.english || anime.title?.romaji || 
                                                anime.title?.native}</span>
                                                <div className="flex gap-4 items-center text-sm lg:text-xl">
                                                    <span>Episode: {anime.episode} -</span>
                                                    <span className='text-gray-300'>{formatTime(anime.airingAt * 1000)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <PlayCircle/>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center sticky bottom-0
                 bg-white/5 bg-gradient-to-r from-black to-black/30 backdrop-blur-xl overflow-hidden p-3">
                    <button onClick={handlePreviousDay}>
                        <Rewind />
                    </button>
                    <span className='text-center'>{currentDay}</span>
                    <button onClick={handleNextDay}>
                        <FastForward />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiringScheduleCard;
