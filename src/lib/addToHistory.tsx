"use client";
import { Error } from "@/types/ErrorTypes";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
type HistoryProps = {
    streamId: string;
    coverImage: string;
    image: string;
    episode: string;
    title: string;
};
const AddToHistory = ({ streamId, coverImage, image, episode, title }: HistoryProps) => {
    const token = getCookie("token");
    const historyData = {
        streamId: streamId,
        coverImage: coverImage,
        image: image,
        episode: episode,
        title: title,
    };
    const addHistory = async () => {
        try {
            const res = await axios.post("/api/history", historyData);
            console.log(res);
        } catch (error: unknown) {
            const Error = error as Error;
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) addHistory();
    }, [token]);

    return (
        <></>
    )
};

export default AddToHistory;
