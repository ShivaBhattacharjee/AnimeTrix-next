"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

import ReloadFunc from "../../error/ReloadFunc";

import Anime from "@/types/animetypes";
interface CardsProps {
    props: Anime[];
}

const Cards: React.FC<CardsProps> = ({ props }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartX = useRef(0);
    const scrollStartX = useRef(0);
    const isDragging = useRef(false);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        isDragging.current = true;
        dragStartX.current = event.clientX;
        scrollStartX.current = containerRef.current!.scrollLeft;
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;

        const dx = event.clientX - dragStartX.current;
        containerRef.current!.scrollLeft = scrollStartX.current - dx;
        event.preventDefault();
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseLeave = () => {
        if (isDragging.current) {
            isDragging.current = false;
        }
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
        dragStartX.current = event.touches[0].clientX;
        scrollStartX.current = containerRef.current!.scrollLeft;
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;

        const touchDeltaX = event.touches[0].clientX - dragStartX.current;
        const scrollIncrement = touchDeltaX * 1.7;

        containerRef.current!.scrollLeft = scrollStartX.current - scrollIncrement;
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const contentWidth = containerRef.current.scrollWidth;
            setMaxScroll(contentWidth - containerWidth);
        }
    }, []);

    const handleMoveLeft = () => {
        if (containerRef.current) {
            const newPosition = Math.max(0, scrollPosition - 150 * 10);
            containerRef.current.scrollTo({
                left: newPosition,
                behavior: "smooth",
            });
            setScrollPosition(newPosition);
        }
    };

    const handleMoveRight = () => {
        if (containerRef.current) {
            const newPosition = Math.min(maxScroll, scrollPosition + 150 * 10);
            containerRef.current.scrollTo({
                left: newPosition,
                behavior: "smooth",
            });
            setScrollPosition(newPosition);
        }
    };

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.section className=" overflow-x-scroll hiddenscroll" variants={container} initial="hidden" animate="visible">
            <div className="flex gap-3 overflow-x-scroll hiddenscroll duration-200" ref={containerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ userSelect: isDragging.current ? "none" : "auto" }}>
                {props.length > 0 ? (
                    props.map((anime, index) => (
                        <motion.div
                            variants={item}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay: 0.2,
                                ease: "easeInOut",
                                duration: 0.5,
                            }}
                            viewport={{ amount: 0 }}
                            key={index}
                            className="flex flex-col relative lg:m-3 m-1 duration-200 rounded-lg cursor-grab"
                            onMouseDown={handleMouseDown}
                        >
                            <Link href={`/details/${anime.id}`} className="content-normal w-full h-full">
                                <div className="relative lg:w-48 w-40 ">
                                    <img src={anime?.image || anime?.coverImage || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${anime?.title?.native || anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji}`} className="rounded-lg hover:scale-105 duration-200 h-52 lg:h-64 " draggable={false} loading="lazy" height={400} width={200} />
                                </div>
                            </Link>
                            <span className="truncate font-semibold w-32 lg:w-44 p-2 text-sm md:text-xl lg:text-lg capitalize">{anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime?.title?.native || "Unknown"}</span>
                            <div className={`truncate w-32 lg:w-44 p-2 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center ${anime.totalEpisodes !== null && anime.totalEpisodes !== undefined ? "green" : "red"}`}>
                                {anime.status === "Ongoing" || (anime.status === "ONGOING" && <div className="w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-green-500"></div>)}
                                <span className=" font-semibold">Ep: {anime?.totalEpisodes || anime?.episodes || 0}</span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <ReloadFunc message="Oops!! Something went wrong" />
                )}
            </div>

            {props.length > 12 && (
                <div className=" justify-end gap-4 hidden md:flex">
                    <MoveLeft size={35} onClick={handleMoveLeft} className=" cursor-pointer" style={{ opacity: scrollPosition === 0 ? 0.5 : 1 }} />
                    <MoveRight size={35} onClick={handleMoveRight} className=" cursor-pointer" style={{ opacity: scrollPosition >= maxScroll ? 0.5 : 1 }} />
                </div>
            )}
        </motion.section>
    );
};

export default Cards;
