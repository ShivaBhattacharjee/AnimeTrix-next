"use client"
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface Anime {
  image: string;
  id: number;
  title: {
    userPreferred?: string;
    english?: string;
    romaji?: string;
    native?: string;
  };
  totalEpisodes: number;
  status: string
}

interface CardsProps {
  props: Anime[];
}

const Cards: React.FC<CardsProps> = ({ props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        event?.preventDefault();
        containerRef.current!.scrollLeft += event.deltaY;
      }
    };

    containerRef?.current!?.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      containerRef?.current!?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setScrollStartX(containerRef.current!.scrollLeft);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = event.clientX - dragStartX;
    containerRef.current!.scrollLeft = scrollStartX - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(event.touches[0].clientX);
    setScrollStartX(containerRef.current!.scrollLeft);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = event.touches[0].clientX - dragStartX;
    containerRef.current!.scrollLeft = scrollStartX - dx;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className='flex gap-3 overflow-x-hidden duration-200 mt-9 lg:grid lg:grid-flow-col-dense'
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ userSelect: isDragging ? 'none' : 'auto' }}
    >
      {props?.map((anime) => {
        return (
          <div
            key={`${anime.id + 1}`}
            className='flex flex-col  lg:m-3 m-1  duration-200 rounded-lg cursor-grab'
            onMouseDown={handleMouseDown}
          >
            <Image
              src={anime?.image}
              className='rounded-lg  aspect-auto 
              content-normal h-full text-sm w-full bg-cover duration-200 hover:scale-105'
              alt={`an image of ${anime?.title?.userPreferred ||
                anime?.title?.english ||
                anime?.title?.romaji ||
                anime.title?.native
                }`}
              height={300}
              width={600}
              draggable={false}
            />
            <span className='truncate w-32 lg:w-44 p-2 text-sm md:text-xl lg:text-lg capitalize'>
              {anime?.title?.userPreferred ||
                anime?.title?.english ||
                anime?.title?.romaji ||
                anime?.title?.native?.toLocaleLowerCase()}
            </span>

            {
              anime?.totalEpisodes !== null && anime?.totalEpisodes !== undefined && (
                <div className='truncate w-32 lg:w-44 p-2 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center'>
                  {anime?.status === "Ongoing" && (
                    <div className="green w-2 lg:w-3 h-2 lg:h-3  rounded-full bg-green-500"></div>
                  )}
                  <span> Ep: {anime?.totalEpisodes}</span>
                </div>
              )
            }

          </div>
        );
      })}
    </div>
  );
};

export default Cards;
