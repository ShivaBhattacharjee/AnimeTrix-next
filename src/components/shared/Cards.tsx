"use client"
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReloadFunc from '../error/ReloadFunc';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
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
    event.preventDefault(); // Prevent default scrolling behavior
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
    event.preventDefault(); // Prevent default scrolling behavior
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  // const handleNextClick = () => {
  //   containerRef.current!.scrollLeft += 400; // Adjust the value for the desired scroll amount
  // };

  // const handlePreviousClick = () => {
  //   containerRef.current!.scrollLeft -= 400; // Adjust the value for the desired scroll amount
  // };
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
      {props.length > 0 ? (
        props.map((anime) => (
          <div
            key={`${anime.id + 1}`}
            className='flex flex-col relative lg:m-3 m-1 duration-200 rounded-lg cursor-grab'
            onMouseDown={handleMouseDown}
          >
            <Link href={`/details/${anime.id}`} className='content-normal w-full h-full'>
              <div className='md:w-48 md:h-64 h-56 w-40 relative'>
                <Image
                  src={anime?.image}
                  alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime.title?.native}`}
                  layout='fill'
                  className='rounded-lg hover:scale-105 duration-200'
                  objectFit='cover'
                  draggable={false}
                />
              </div>
            </Link>
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
        ))
      ) : (
        <ReloadFunc message='Opps!! Something went wrong' />
      )}
      {/* <div className=' absolute flex flex-col right-0 h-screen bg-gradient-to-r from-black '>
            <ArrowBigRightDash onClick={handlePreviousClick} className=' w-28 h-28'/>
            <ArrowBigLeftDash onClick={handleNextClick} className=' w-28 h-28'/>
            </div> */}
    </div>
  );

};

export default Cards;
