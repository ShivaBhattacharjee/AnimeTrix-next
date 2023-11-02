"use client";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Bookmark } from "lucide-react";
import React from "react";

type BookmarkProps = {
    animeId: number;
    image: string;
    title: string;
};
const AddToBookmark = ({ animeId, image, title }: BookmarkProps) => {
    const token = getCookie("token");
    const addBookmark = async () => {
        if (token) {
            try {
                const data = {
                    animeId: animeId,
                    image: image,
                    title: title,
                };
                const res = await axios.post("/api/bookmark", data);
                console.log(res);
                Toast.SuccessshowToast(res.data.message || "Added to bookmark");
            } catch (error: unknown) {
                const Error = error as Error;
                console.log(Error);
                Toast.ErrorShowToast(Error?.response?.data?.error || "Something Went Wrong");
            }
        } else {
            Toast.ErrorShowToast("Please Login First");
        }
    };
    return (
        <button onClick={addBookmark} className="flex p-4 border-2 items-center gap-3 font-semibold dark:border-white border-black rounded-lg duration-200 hover:scale-95">
            <Bookmark />
            Bookmark
        </button>
    );
};

export default AddToBookmark;
