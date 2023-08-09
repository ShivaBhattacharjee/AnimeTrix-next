"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './styles.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface AnimeData {
  id: number;
  title: string;
  coverImage: string;
}

interface SliderProps {
  posts: AnimeData[];
}
const Slider: React.FC<SliderProps> = ({ posts }) => {
  const progressCircle = useRef<SVGSVGElement>(null!);
  const progressContent = useRef<HTMLElement>(null!);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    progressCircle.current?.style.setProperty('--progress', String(1 - progress));
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const goNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const saveSwiperInstance = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  return (
    <>
      <div className='flex absolute  z-10 gap-4 p-3 items-center'>
        <button
          className='bg-black/80 backdrop-blur-2xl text-white p-2 lg:p-4 rounded-full flex justify-center'
          onClick={goPrev}
        >
          <ArrowLeft />
        </button>
        <button
          className='bg-black/80 text-white p-2 lg:p-4 rounded-full flex justify-center'
          onClick={goNext}
        >
          <ArrowRight />
        </button>
        {/* <span ref={progressContent} className='text-white'></span> */}
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className='mySwiper'
        onSwiper={saveSwiperInstance}
      >
        {
          posts?.map((popular: any) => {
            return (
              <SwiperSlide key={popular.id}>
              <Image
                src={popular.cover}
                alt={popular.title.userPreferred || popular.title.romaji}
                width={1366}
                height={768}
                className='relative'
              />
              <div className='absolute text-white bg-black/50 w-full h-full'>
                <div className='absolute text-left flex gap-3 flex-col bottom-0 lg:bottom-20 pb-4 md:text-4xl p-4'>
                  <h1 className='z-50 truncate w-80 lg:w-full md:w-96'>{popular?.title.userPreferred}</h1>
                  <p></p>
                </div>
              </div>
  
            </SwiperSlide>
          )})
        }
      </Swiper>
    </>
  );
}
export default Slider