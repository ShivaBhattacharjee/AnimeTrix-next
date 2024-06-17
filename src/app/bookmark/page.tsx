"use client";

import { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AlertTriangle, BookmarkMinus } from "lucide-react";
import Link from "next/link";

import Forbidden from "@/components/Forbidden";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

type BookmarkItem = {
    animeId: string;
    image: string;
    title: string;
    _id: string;
};

type UserBookmarkResponse = {
    nextPage: boolean;
    bookmarks: BookmarkItem[];
    userBookmarks: {
        bookmarks: BookmarkItem[];
    };
};

const Page = () => {
    const [tokenExistOrNot, setTokenExistOrNot] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bookmark, setBookmark] = useState<BookmarkItem[]>([]);
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

    const getUserBookmark = async () => {
        try {
            const response = await fetch(`/api/bookmark?page=${currentPage}`);
            if (token) {
                if (!response.ok) {
                    Toast.ErrorShowToast("Network response was not ok");
                }
            }
            const data: UserBookmarkResponse = await response.json();
            setBookmark(data?.userBookmarks?.bookmarks || []);
            setLoading(false);
        } catch (error: unknown) {
            console.error(error);
            setLoading(false);
        }
    };
    const fetchNextPage = async (page: number) => {
        try {
            const apiUrl = `/api/bookmark?page=${page}`;
            const response = await fetch(apiUrl);
            const nextPageData: UserBookmarkResponse = await response.json();
            return nextPageData.userBookmarks.bookmarks;
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
                setBookmark([...bookmark, ...nextPageData]);
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };

    const deleteBookmark = async (animeId: string) => {
        try {
            const data = {
                animeId: animeId,
            };
            const res = await axios.delete("/api/bookmark", { data });
            Toast.SuccessshowToast(res?.data?.message || "Deleted successfully");
            getUserBookmark();
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfTokenExistOrNot();
        if (token) getUserBookmark();
    }, [token]);

    return (
        <div className="min-h-screen">
            {tokenExistOrNot ? (
                <>
                    {loading ? (
                        <LoadingSkeleton title="Bookmarks" />
                    ) : (
                        <Suspense>
                            <div className="p-4 pb-40 lg:pb-16 md:m-auto">
                                <h1 className="text-3xl lg:text-5xl font-bold text-white">Bookmarks</h1>
                                {bookmark?.length > 0 ? (
                                    <InfiniteScroll
                                        className="hiddenscroll overflow-y-hidden m-auto  w-full grid grid-cols-2 gap-6 place-items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center lg:p-5 mt-8 "
                                        dataLength={bookmark?.length}
                                        next={loadMoreData}
                                        hasMore={hasMore}
                                        endMessage={<span className="rounded-lg duration-200 hover:scale-105 border-2 border-dashed border-white w-40  max-lg:h-56 lg:w-48 h-72 p-4">You&rsquo;ve hit the void, nothing left, scroll up for giggles!</span>}
                                        loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                                            <div className="rounded-lg duration-200 hover:scale-105 bg-white/60 animate-pulse w-40  max-lg:h-56 lg:w-48 h-72" key={index} />
                                        ))}
                                    >
                                        {bookmark?.map((item) => (
                                            <div key={item._id} className="border-2 border-white/30 card-img rounded-lg">
                                                <div className="content-normal relative overflow-hidden w-full h-full">
                                                    <Link href={`/details/${item.animeId}`} className="md:w-48 h-60  relative overflow-hidden">
                                                        <img src={item.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${item?.animeId}`} className=" rounded-t-lg hover:scale-105 duration-200 h-60 lg:h-64 w-full " draggable="false" loading="lazy" height={400} width={200} />
                                                    </Link>
                                                    <div className="flex flex-col gap-3 p-2">
                                                        <span className="truncate font-semibold w-32 lg:w-44 text-sm md:text-xl lg:text-lg capitalize mb-4">{item.title || "Unknown Title"}</span>
                                                    </div>
                                                    <h1 className=" bg-black rounded-full absolute right-3 top-2 p-2 cursor-pointer">
                                                        <BookmarkMinus size={30} className=" duration-200 hover:text-red-500" onClick={() => deleteBookmark(item.animeId || "Unknown")} />
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
                        </Suspense>
                    )}
                </>
            ) : (
                <Forbidden />
            )}
        </div>
    );
};

export default Page;
