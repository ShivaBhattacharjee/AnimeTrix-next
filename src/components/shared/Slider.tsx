"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ReloadFunc from "../error/ReloadFunc";

import "./SliderStyles.css";

import Anime from "@/types/animetypes";
interface SliderProps {
    Trending: Anime[];
}
interface SwiperInstance {
    slideNext: () => void;
    slidePrev: () => void;
}
const Slider: React.FC<SliderProps> = ({ Trending }) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>();

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

    const saveSwiperInstance = (swiper: SwiperInstance) => {
        setSwiperInstance(swiper);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                type: "keyframes",
                stiffness: 260,
                damping: 20,
            }}
        >
            <div className="flex absolute z-10 gap-4 p-3 items-center">
                <button className="bg-black/80 backdrop-blur-2xl text-white p-2 lg:p-4 rounded-full flex justify-center" onClick={goPrev} aria-label="go previous slide">
                    <ArrowLeft />
                </button>
                <button className="bg-black/80 text-white p-2 lg:p-4 rounded-full flex justify-center" onClick={goNext} aria-label="go next slide">
                    <ArrowRight />
                </button>
            </div>
            <Swiper
                spaceBetween={20}
                centeredSlides={false}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
                onSwiper={saveSwiperInstance}
            >
                {Trending.length > 0 ? (
                    Trending.map((popular: Anime) => (
                        <SwiperSlide key={popular.id}>
                            <img src={popular.cover} alt={`Slider of ${popular.title.userPreferred || popular.title.romaji}`} loading="lazy" className="relative aspect-auto" />
                            <div className="absolute text-white bg-black/50 w-full h-full">
                                <div className="absolute text-left flex gap-3 flex-col bottom-3 pb-4 md:text-4xl p-4 w-[90%]">
                                    <h1 className="z-50 truncate 2xl:w-full w-[90%] lg:text-5xl lg:font-bold overflow-hidden">{popular?.title.userPreferred || popular?.title?.romaji}</h1>
                                    <Link href={`/details/${popular.id}`} className="bg-white text-center shadow-lg font-semibold text-black lg:w-44 lg:p-3 2xl:w-52 2xl:p-4 lg:text-2xl lg:mt-8  p-3 w-32 text-sm rounded-lg">
                                        Watch Now
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <ReloadFunc message="Error loading Slider" />
                    </SwiperSlide>
                )}
            </Swiper>
        </motion.section>
    );
};
export default Slider;
