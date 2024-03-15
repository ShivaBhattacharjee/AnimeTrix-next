"use client";
import React, { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
interface NextAiringEpisodeProps {
    nextAiringEpisode: {
        episode: number;
    } | null;
    formattedAiringDate: string;
}

const NextAiringEpisode: React.FC<NextAiringEpisodeProps> = ({ nextAiringEpisode, formattedAiringDate }) => {
    const initialCloseState = useMemo(() => false, []);
    const [close, setClose] = useState<boolean>(initialCloseState);

    const handleClose = useCallback(() => {
        setClose((prevClose) => !prevClose);
    }, []);
    return (
        <>
            {!close && (
                <span className="bg-white flex relative justify-between items-center lg:text-lg text-md mt-4 text-black  w-full  font-bold text-center p-4 rounded-lg">
                    Episode {nextAiringEpisode?.episode} expected on {formattedAiringDate}
                    <X onClick={handleClose} className=" absolute md:top-2 cursor-pointer top-1 md:right-4 right-2" />
                </span>
            )}
        </>
    );
};

export default NextAiringEpisode;
