"use client";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Bookmark, BookMarked } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

type BookmarkProps = {
    animeId: number;
    image: string;
    title: string;
};
const AddToBookmark = ({ animeId, image, title }: BookmarkProps) => {
    const token = getCookie("token");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkCheckLoading, setBookmarkCheckLoading] = useState(true);

    const checkBookmarkStatus = async () => {
        console.log("Checking bookmark status for animeId:", animeId);
        if (token) {
            try {
                setBookmarkCheckLoading(false);
                const response = await axios.get("/api/bookmark");
                const { userBookmarks } = response.data;
                console.log("User bookmarks:", userBookmarks);
                const isAnimeBookmarked = userBookmarks.bookmarks.some((bookmark: BookmarkProps) => bookmark.animeId == animeId);
                console.log("Is anime bookmarked?", isAnimeBookmarked);
                setIsBookmarked(isAnimeBookmarked);
            } catch (error) {
                setBookmarkCheckLoading(false);
                console.error("Error checking bookmark status:", error);
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
                console.log(res);
                Toast.SuccessshowToast(res.data.message || "Added to bookmark");
                checkBookmarkStatus();
            } catch (error: unknown) {
                const Error = error as Error;
                console.log(Error);
                Toast.ErrorShowToast(Error?.response?.data?.error || "Something Went Wrong");
            }
        } else {
            Toast.ErrorShowToast("Please Login First");
        }
    };
    const deleteBookmark = async (animeId: number) => {
        console.log("Deleting bookmark for animeId:", animeId);
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
            console.log(error);
        }
    };

    return (
        <>
            {bookmarkCheckLoading ? (
                <button className="flex p-4 border-2 items-center gap-3 font-semibold dark:border-white border-black rounded-lg duration-200 hover:scale-95">
                    <BarLoader aria-setsize={20} color="#2563EB" />
                </button>
            ) : (
                <button onClick={() => (isBookmarked ? deleteBookmark(animeId) : addBookmark())} className={`flex p-4 border-2 items-center gap-3 font-semibold ${isBookmarked ? "border-green-500" : "dark:border-white border-black"} rounded-lg duration-200 hover:scale-95 ${isBookmarked ? "text-green-500" : ""}`}>
                    {isBookmarked ? <BookMarked /> : <Bookmark />}
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
            )}
        </>
    );
};

export default AddToBookmark;
