"use client";

import React, { useEffect, useRef, useState } from "react";

const CardSkeleton = () => {
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

        const currentContainerRef = containerRef.current; // Store a reference

        currentContainerRef?.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            currentContainerRef?.removeEventListener("wheel", handleWheel);
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
        <div className="flex gap-3 overflow-x-hidden duration-200 mt-9 lg:grid lg:grid-flow-col-dense" ref={containerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ userSelect: isDragging ? "none" : "auto" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((anime) => (
                <div key={anime} className="flex flex-col lg:m-3 m-1 duration-200 rounded-lg cursor-grab" onMouseDown={handleMouseDown}>
                    <div className="rounded-lg duration-200 hover:scale-105  bg-white/60 animate-pulse w-40 max-lg:h-56 lg:w-60 h-72" />
                </div>
            ))}
        </div>
    );
};

export default CardSkeleton;
