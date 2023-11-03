"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AlertTriangle, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SpinLoading from "@/components/loading/SpinLoading";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
type HistoryItem = {
    streamId: string;
    animeId: number;
    image: string;
    coverImage: string;
    episode: string;
    title: string;
    _id: string;
};
type BookmarkItem = {
    animeId: number;
    image: string;
    title: string;
    _id: string;
};

type UserHistoryResponse = {
    nextPage: boolean;
    history: HistoryItem[];
    userHistory: {
        history: HistoryItem[];
    };
};

type UserBookmarkResponse = {
    nextPage: boolean;
    bookmarks: BookmarkItem[];
    userBookmarks: {
        bookmarks: BookmarkItem[];
    };
};

const Page = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [bookmarkLoading, setBookmarkLoading] = useState(true);
    const [bookmark, setBookmark] = useState<BookmarkItem[]>([]);
    const router = useRouter();
    const token = getCookie("token");
    const logout = async () => {
        try {
            await axios.get("/api/logout");
            Toast.SuccessshowToast("Logout Successfull");
            router.refresh();
            router.push("/");
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
        }
    };
    const getUserData = async () => {
        try {
            const userResponse = await fetch("/api/get-users");
            const user = await userResponse.json();
            setUserName(user?.userData?.username);
            setEmail(user?.userData?.email);
            setLoading(false);
        } catch (error: unknown) {
            const Error = error as Error;
            setLoading(false);
            Toast.ErrorShowToast(Error?.message || "Something went wrong");
        }
    };
    const getUserHistory = async () => {
        try {
            const response = await fetch("/api/history");
            if (token) {
                if (!response.ok) {
                    throw new Error("Network response error");
                }
            }
            const data: UserHistoryResponse = await response.json();
            setHistory(data?.userHistory?.history || []);
            setHistoryLoading(false);
            console.dir(data);
        } catch (error: unknown) {
            console.error(error);
            setHistoryLoading(false);
        }
    };
    const getUserBookmark = async () => {
        try {
            const response = await fetch("/api/bookmark");
            if (token) {
                if (!response.ok) {
                    throw new Error("Network response error");
                }
            }
            const data: UserBookmarkResponse = await response.json();
            setBookmark(data?.userBookmarks?.bookmarks || []);
            setBookmarkLoading(false);
            console.dir(data);
        } catch (error: unknown) {
            console.error(error);
            setBookmarkLoading(false);
        }
    };
    useEffect(() => {
        getUserData();
        if (token) {
            getUserHistory();
            getUserBookmark();
        }
    }, [token]);
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-[100dvh]">
                    <SpinLoading />
                </div>
            ) : (
                <div className="min-h-[100dvh]">
                    <div className=" p-4 flex flex-col lg:flex-row gap-3 items-center justify-between">
                        <div className="flex flex-col lg:flex-row items-center gap-5">
                            <div className=" h-24 w-24 lg:h-32 lg:w-32 rounded-full dark:bg-white bg-black dark:text-black text-white flex justify-center items-center ">
                                <h1 className=" font-bold text-4xl">{userName?.charAt(0).toUpperCase() || "?"}</h1>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <h1 className="text-3xl font-semibold">{userName || "Unknown"}</h1>
                                <span className=" opacity-70 tracking-wide">{email || "Unknown"}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link href={"/edit-profile"} className=" dark:bg-white bg-black p-3 dark:text-black text-white rounded-full font-semibold dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white">
                                Manage Account
                            </Link>
                            <button onClick={logout} className="dark:bg-white/80 bg-black/80 dark:text-black text-white p-3 rounded-lg dark:hover:bg-transparent duration-200 dark:hover:text-white hover:scale-110">
                                <LogOut />
                            </button>
                        </div>
                    </div>
                    <h1 className=" h-1 dark:bg-white/20 bg-black/20 w-full"></h1>

                    <div className="flex flex-col p-5">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold">History</h1>
                            <Link href={"/history"} className="text-sm flex gap-2 items-center font-extrabold lg:text-lg">
                                Load more
                                <ChevronRight size={30} />
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            {historyLoading ? (
                                <div className="flex w-full justify-center items-center">
                                    <SpinLoading />
                                </div>
                            ) : (
                                <>
                                    {history.length > 0 ? (
                                        <div className="hiddenscroll overflow-y-hidden m-auto  w-full grid grid-cols-2 gap-3 place-items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 items-center  mt-8">
                                            {history?.map((item) => (
                                                <div key={item._id} className="border-2 border-black/20 dark:border-white/30 card-img rounded-lg">
                                                    <Link href={`/watch/${item.streamId}/${item.animeId}`} className="content-normal overflow-hidden w-full h-full">
                                                        <div className="md:w-48 h-60  relative overflow-hidden">
                                                            <img src={item.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${item?.animeId}`} className=" rounded-t-lg hover:scale-105 duration-200 h-60 lg:h-64 w-full " draggable="false" loading="lazy" height={400} width={200} />
                                                        </div>
                                                        <div className="flex flex-col gap-3 p-2">
                                                            <span className="truncate font-semibold w-32 lg:w-44 text-sm md:text-xl lg:text-lg capitalize">{item.title || "Unknown Title"}</span>
                                                            {item?.episode !== null && item?.episode !== undefined ? (
                                                                <div className="truncate w-32 lg:w-44 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center">
                                                                    <span className=" font-semibold"> Ep: {item?.episode}</span>
                                                                </div>
                                                            ) : (
                                                                <div className="truncate w-32 lg:w-44 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center">
                                                                    <span> Ep: Unknown</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center w-full mt-5 gap-3">
                                            <AlertTriangle size={40} />
                                            <h1 className="text-3xl font-semibold">No videos found</h1>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <h1 className=" h-1 dark:bg-white/20 bg-black/20 w-full"></h1>

                    <div className="flex flex-col p-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl lg:text-5xl font-bold">Bookmark</h1>
                            <Link href={"/bookmark"} className=" flex items-center gap-2 text-sm lg:text-lg font-extrabold">
                                Load more
                                <ChevronRight size={30} />
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            {bookmarkLoading ? (
                                <div className="flex w-full justify-center items-center">
                                    <SpinLoading />
                                </div>
                            ) : (
                                <>
                                    {bookmark.length > 0 ? (
                                        <div className="hiddenscroll overflow-y-hidden m-auto  w-full grid grid-cols-2 gap-3 place-items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 items-center  mt-8">
                                            {bookmark?.map((item) => (
                                                <div key={item._id} className="border-2 border-black/20 dark:border-white/30 card-img rounded-lg">
                                                    <Link href={`/details/${item.animeId}`} className="content-normal overflow-hidden w-full h-full">
                                                        <div className="md:w-48 h-60  relative overflow-hidden">
                                                            <img src={item.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${item?.animeId}`} className=" rounded-t-lg hover:scale-105 duration-200 h-60 lg:h-64 w-full " draggable="false" loading="lazy" height={400} width={200} />
                                                        </div>
                                                        <div className="flex flex-col gap-3 p-2 mb-5">
                                                            <span className="truncate font-semibold w-32 lg:w-44 text-sm md:text-xl lg:text-lg capitalize">{item.title || "Unknown Title"}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center w-full mt-5 gap-3">
                                            <AlertTriangle size={40} />
                                            <h1 className="text-3xl font-semibold">No videos found</h1>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
