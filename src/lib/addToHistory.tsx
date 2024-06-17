"use client";

import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

import { Error } from "@/types/ErrorTypes";

type HistoryProps = {
    streamId: string;
    animeId: number;
    coverImage: string;
    image: string;
    episode: string;
    title: string;
};
const AddToHistory = ({ streamId, animeId, coverImage, image, episode, title }: HistoryProps) => {
    const token = getCookie("token");
    const historyData = {
        streamId: streamId,
        animeId: animeId,
        coverImage: coverImage,
        image: image,
        episode: episode,
        title: title,
    };
    const addHistory = async () => {
        try {
            await axios.post("/api/history", historyData);
        } catch (error: unknown) {
            const Error = error as Error;
            console.log(Error?.response?.data?.error || "Something went wrong");
        }
    };

    useEffect(() => {
        if (token) addHistory();
    }, [token]);

    return <></>;
};

export default AddToHistory;
