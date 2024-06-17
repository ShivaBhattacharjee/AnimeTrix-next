"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AlertTriangle, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

import ProfileLoading from "@/components/loading/ProfileLoading";
import SpinLoading from "@/components/loading/SpinLoading";
import UserContext from "@/context/getUserDetails";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const HistoryItemSchema = z.object({
    streamId: z.string(),
    animeId: z.number(),
    image: z.string(),
    coverImage: z.string(),
    episode: z.string(),
    title: z.string(),
    _id: z.string(),
});

const BookmarkItemSchema = z.object({
    animeId: z.number(),
    image: z.string(),
    title: z.string(),
    _id: z.string(),
});

const UserHistoryResponseSchema = z.object({
    nextPage: z.boolean(),
    history: z.array(HistoryItemSchema),
    userHistory: z.object({
        history: z.array(HistoryItemSchema),
    }),
});

const UserBookmarkResponseSchema = z.object({
    nextPage: z.boolean(),
    bookmarks: z.array(BookmarkItemSchema),
    userBookmarks: z.object({
        bookmarks: z.array(BookmarkItemSchema),
    }),
});

type HistoryItem = z.infer<typeof HistoryItemSchema>;

type BookmarkItem = z.infer<typeof BookmarkItemSchema>;

type UserHistoryResponse = z.infer<typeof UserHistoryResponseSchema>;

type UserBookmarkResponse = z.infer<typeof UserBookmarkResponseSchema>;

const Page = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [bookmarkLoading, setBookmarkLoading] = useState(true);
    const [bookmark, setBookmark] = useState<BookmarkItem[]>([]);

    const { loading, username, profilePicture, email, userDescription } = useContext(UserContext);
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

    const getUserHistory = async () => {
        try {
            const response = await fetch(`/api/history?page=1`);
            if (!response.ok) {
                Toast.ErrorShowToast("Network response error");
            }

            const data = (await response.json()) as UserHistoryResponse; // Type-cast fetched data
            setHistory(data.userHistory.history || []);
            setHistoryLoading(false);
            console.dir(data);
        } catch (error) {
            console.error(error);
            setHistoryLoading(false);
        }
    };
    const getUserBookmark = async () => {
        try {
            const response = await fetch("/api/bookmark?page=1");
            if (token) {
                if (!response.ok) {
                    Toast.ErrorShowToast("Network response error");
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
        if (token) {
            getUserHistory();
            getUserBookmark();
        }
    }, [token]);
    return (
        <>
            {loading ? (
                <>
                    <ProfileLoading />
                </>
            ) : (
                <div className="min-h-[100dvh]">
                    <div className=" p-4 flex flex-col lg:flex-row gap-3 items-center justify-between">
                        <div className="flex flex-col lg:flex-row items-center gap-5">
                            <div className=" h-24 w-24 lg:h-32 relative lg:w-32 rounded-full bg-white text-black flex justify-center items-center ">{profilePicture ? <img src={profilePicture} alt={`profile picture of ${username}`} className="rounded-full" /> : <h1 className=" font-bold text-4xl">{username?.charAt(0).toUpperCase() || "?"}</h1>}</div>
                            <div className="flex flex-col items-center lg:items-start">
                                <h1 className="text-3xl font-semibold">{username || "Unknown"}</h1>
                                <span className=" opacity-70 tracking-wide">{email || "Unknown"}</span>
                                <p className="truncate w-72 font-medium tracking-wide  text-center  lg:text-left">{userDescription || ""}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link href={"/edit-profile"} className=" bg-white  p-3 text-black  rounded-full font-semibold hover:bg-transparent hover:border-2 hover:border-white duration-200 hover:text-white">
                                Manage Account
                            </Link>
                            <button onClick={logout} className="bg-white/80 text-black  p-3 rounded-lg hover:bg-transparent duration-200 hover:text-white hover:scale-110">
                                <LogOut />
                            </button>
                        </div>
                    </div>
                    <h1 className=" h-[1px] bg-white/20  w-full"></h1>

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
                                            {history.slice(0, 8)?.map((item) => (
                                                <div key={item._id} className="border-2  border-white/30 card-img rounded-lg">
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

                    <h1 className=" h-[1px] bg-white/20 w-full"></h1>

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
                                            {bookmark
                                                .slice(-8)
                                                .reverse()
                                                ?.map((item) => (
                                                    <div key={item._id} className="border-2 border-white/30 card-img rounded-lg">
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
