"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AlertTriangle, Trash } from "lucide-react";
import Link from "next/link";

import Forbidden from "@/components/Forbidden";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
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

type UserHistoryResponse = {
    nextPage: boolean;
    history: HistoryItem[];
    userHistory: {
        history: HistoryItem[];
    };
};

const Page = () => {
    const [tokenExistOrNot, setTokenExistOrNot] = useState(false);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const token = getCookie("token");

    function checkIfTokenExistOrNot() {
        if (token === undefined || token === null || token.length === 0) {
            setTokenExistOrNot(false);
        } else {
            setTokenExistOrNot(true);
        }
    }

    const getUserHistory = async () => {
        try {
            const response = await fetch(`/api/history?page=${currentPage}`);
            if (!response.ok) {
                Toast.ErrorShowToast("Network response error");
            }

            const data = (await response.json()) as UserHistoryResponse;
            setHistory(data.userHistory.history || []);
            setLoading(false);
            console.dir(data);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchNextPage = async (page: number) => {
        try {
            const apiUrl = `/api/history?page=${page}`;
            const response = await fetch(apiUrl);
            const nextPageData: UserHistoryResponse = await response.json();
            return nextPageData.userHistory.history; // Return the history array directly
        } catch (error) {
            console.error("Error fetching data for page:", page, error);
            return [];
        }
    };
    const loadMoreData = async () => {
        try {
            const nextPage = currentPage + 1;
            const nextPageData = await fetchNextPage(nextPage);
            if (nextPageData.length === 0) {
                setHasMore(false);
            } else {
                setCurrentPage(nextPage);
                setHistory([...history, ...nextPageData]);
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };
    const deleteHistory = async (streamId: string) => {
        try {
            const data = {
                streamId: streamId,
            };
            const res = await axios.delete("/api/history", { data });
            Toast.SuccessshowToast(res?.data?.message || "Deleted successfully");
            getUserHistory();
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg?.message || "Something went wrong");
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfTokenExistOrNot();
        if (token) getUserHistory();
    }, [token]);

    return (
        <div className="min-h-screen">
            {tokenExistOrNot ? (
                <>
                    {loading ? (
                        <LoadingSkeleton title="History" />
                    ) : (
                        <div className="p-4 pb-40 lg:pb-16 md:m-auto">
                            <h1 className="text-3xl lg:text-5xl font-bold text-white">History</h1>
                            {history.length > 0 ? (
                                <InfiniteScroll
                                    className="hiddenscroll overflow-y-hidden m-auto  w-full grid grid-cols-2 gap-6 place-items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center lg:p-5 mt-8 "
                                    dataLength={history?.length}
                                    next={loadMoreData}
                                    hasMore={hasMore}
                                    endMessage={<span className="rounded-lg duration-200 hover:scale-105 border-2 border-dashed border-white w-40  max-lg:h-56 lg:w-48 h-72 p-4">You&rsquo;ve hit the void, nothing left, scroll up for giggles!</span>}
                                    loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                                        <div className="rounded-lg duration-200 hover:scale-105 bg-white/60 animate-pulse w-40  max-lg:h-56 lg:w-48 h-72" key={index} />
                                    ))}
                                >
                                    {history?.map((item) => (
                                        <div key={item._id} className="border-2 border-white/30 card-img rounded-lg">
                                            <div className="content-normal relative overflow-hidden w-full h-full">
                                                <Link href={`/watch/${item.streamId}/${item.animeId}`} className="md:w-48 h-60  relative overflow-hidden">
                                                    <img src={item.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${item?.animeId}`} className=" rounded-t-lg hover:scale-105 duration-200 h-60 lg:h-64 w-full " draggable="false" loading="lazy" height={400} width={200} />
                                                </Link>
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
                                                <h1 className=" bg-black rounded-full absolute right-3 top-2 p-2 cursor-pointer">
                                                    <Trash size={30} className=" duration-200 hover:text-red-500" onClick={() => deleteHistory(item?.streamId || "Unknown")} />
                                                </h1>
                                            </div>
                                        </div>
                                    ))}
                                </InfiniteScroll>
                            ) : (
                                <div className="flex justify-center items-center min-h-[70vh]  flex-col gap-3">
                                    <AlertTriangle size={40} />
                                    <h1 className="text-3xl font-semibold">No videos found</h1>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Forbidden />
            )}
        </div>
    );
};

export default Page;
