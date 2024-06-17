"use client";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Bookmark, BookMarked } from "lucide-react";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

type BookmarkProps = {
    animeId: number;
    image: string;
    title: string;
    isStream?: boolean;
};
const AddToBookmark = ({ animeId, image, title, isStream }: BookmarkProps) => {
    const token = getCookie("token");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkCheckLoading, setBookmarkCheckLoading] = useState(false);

    const checkBookmarkStatus = async () => {
        if (token) {
            setBookmarkCheckLoading(true);
            try {
                setBookmarkCheckLoading(false);
                const response = await axios.get("/api/bookmark");
                const { userBookmarks } = response.data;
                const isAnimeBookmarked = userBookmarks.bookmarks.some((bookmark: BookmarkProps) => bookmark.animeId == animeId);
                setIsBookmarked(isAnimeBookmarked);
            } catch (error) {
                console.log("error checkBookmarkStatus", error);
                setBookmarkCheckLoading(false);
            } finally {
                setBookmarkCheckLoading(false);
            }
        }
    };

    useEffect(() => {
        checkBookmarkStatus();
    }, []);
    const addBookmark = async () => {
        if (token) {
            try {
                const data = {
                    animeId: animeId,
                    image: image,
                    title: title,
                };
                const res = await axios.post("/api/bookmark", data);
                Toast.SuccessshowToast(res.data.message || "Added to bookmark");
                checkBookmarkStatus();
            } catch (error: unknown) {
                const Error = error as Error;
                Toast.ErrorShowToast(Error?.response?.data?.error || "Something Went Wrong");
            }
        } else {
            Toast.ErrorShowToast("Please Login First");
        }
    };
    const deleteBookmark = async (animeId: number) => {
        const parsedAnimeId = parseInt(animeId.toString());
        try {
            const data = {
                animeId: parsedAnimeId,
            };
            const res = await axios.delete("/api/bookmark", { data });
            Toast.SuccessshowToast(res?.data?.message || "Deleted successfully");
            checkBookmarkStatus();
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <>
            {isStream ? (
                <button onClick={() => (isBookmarked ? deleteBookmark(animeId) : addBookmark())} className="flex justify-end w-full">
                    {isBookmarked ? <Bookmark size={40} className="fill-white duration-200 cursor-pointer" /> : <Bookmark size={40} className=" hover:fill-white duration-200 cursor-pointer" />}
                </button>
            ) : (
                <>
                    {bookmarkCheckLoading ? (
                        <button className="flex p-4 border-2 items-center gap-3 font-semibold border-white  rounded-lg duration-200 hover:scale-95">
                            <BarLoader aria-setsize={20} color="#2563EB" />
                        </button>
                    ) : (
                        <button onClick={() => (isBookmarked ? deleteBookmark(animeId) : addBookmark())} className={`flex p-4 border-2 items-center gap-3 font-semibold ${isBookmarked ? "border-green-500" : "border-white"} rounded-lg duration-200 hover:scale-95 ${isBookmarked ? "text-green-500" : ""}`}>
                            {isBookmarked ? <BookMarked /> : <Bookmark />}
                            {isBookmarked ? "Bookmarked" : "Bookmark"}
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default AddToBookmark;
