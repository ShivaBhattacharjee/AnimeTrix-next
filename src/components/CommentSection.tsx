"use client";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Clipboard, ClipboardPaste, StickyNote, Trash } from "lucide-react";

import UserContext from "@/context/getUserDetails";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

type Props = {
    streamId: string;
};

type comment = {
    text: string;
    timestamp: Date;
    userId: number;
    _id: number;
};

const CommentSection = ({ streamId }: Props) => {
    const token = getCookie("token");
    const [comment, setComment] = useState<string>("");
    const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
    const [commentData, setCommentData] = useState<comment[]>([]);
    const { userId } = useContext(UserContext);
    const [userData, setUserData] = useState<{ [key: string]: { username: string; profilePicture: string } }>({});
    const [showClipboardIcon, setShowClipboardIcon] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getComment = async () => {
        try {
            const res = await axios.get(`/api/comment?streamId=${streamId}&page=${page}`);
            const comments = res?.data?.comment?.comments || [];
            setCommentData(comments);
            const userIds = comments.map((comment: comment) => comment.userId) || [];

            const usersData = await Promise.all(
                userIds.map(async (userId: number) => {
                    const userResponse = await fetch(`/api/get-users?userId=${userId}`);
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        return { [userId]: { username: userData?.userData?.username, profilePicture: userData?.userData?.profilePicture } };
                    }
                    return {};
                }),
            );

            setUserData(Object.assign({}, ...usersData));
        } catch (error: unknown) {
            console.log(error);
        }
    };
    const fetchMoreData = async () => {
        try {
            const res = await axios.get(`/api/comment?streamId=${streamId}&page=${page + 1}`);
            const comments: comment[] = res?.data?.comment?.comments || [];
            setPage(page + 1);
            setCommentData((prevComments: comment[]) => [...prevComments, ...comments]);
        } catch (error) {
            console.error(error);
            setHasMore(false);
        }
    };

    const HandleaddComment = async () => {
        userId;
        const commentData = {
            streamId: streamId,
            text: comment,
        };
        if (token) {
            if (comment.length < 1) return Toast.ErrorShowToast("Comment should have at least 1 character");
            try {
                setAddCommentLoading(true);
                const response = await axios.post("/api/comment", commentData);
                Toast.SuccessshowToast(response?.data?.message || "Comment Added");
                setComment("");
                console.log(response);
                getComment();
            } catch (error: unknown) {
                setAddCommentLoading(false);
                const ErrorMsg = error as Error;
                console.log(error);
                Toast.ErrorShowToast(ErrorMsg?.response?.data?.error || "Something went wrong");
            } finally {
                setAddCommentLoading(false);
            }
        } else {
            Toast.ErrorShowToast("Please Login to comment");
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            const res = await axios.delete("/api/comment", { data: { commentId: commentId } });
            Toast.SuccessshowToast(res?.data?.message || "Comment Deleted");
            getComment();
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg?.response?.data?.error || "Something went wrong");
        }
    };
    const formatTimestamp = (timestamp: Date) => {
        const currentDate = new Date();
        const commentDate = new Date(timestamp);
        const timeDifference = currentDate.getTime() - commentDate.getTime();

        const seconds = Math.floor(timeDifference / 1000);

        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        }

        const days = Math.floor(hours / 24);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                Toast.SuccessshowToast("Copied to clipboard");
                setShowClipboardIcon(false);

                setTimeout(() => {
                    setShowClipboardIcon(true);
                }, 3500);
            })
            .catch(() => Toast.ErrorShowToast("Failed to copy to clipboard"));
    };

    useEffect(() => {
        getComment();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-3 mt-4">
                <h1 className="text-2xl mt-4 font-semibold">{commentData?.length || undefined} Comments</h1>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" className="p-2 w-full lg:w-1/2 rounded-lg h-20 bg-transparent border border-white/25 focus:outline-none"></textarea>
                <button className=" text-xl bg-white p-4 rounded-lg w-1/2 justify-center flex items-center gap-3 md:w-44 text-black font-semibold" onClick={HandleaddComment}>
                    {addCommentLoading && <ClipLoader size={20} color="#000" />}
                    {addCommentLoading ? "Adding" : "Add Comment"}
                </button>
                {commentData?.length == 0 || comment === undefined ? (
                    <h1 className="text-3xl font-semibold items-center mt-5 rounded-lg lg:w-1/2 flex gap-3 ">
                        <StickyNote />
                        Be the first to comment
                    </h1>
                ) : (
                    <div className=" mt-4 relative grid gap-4 ">
                        <InfiniteScroll
                            className="w-full border-2 flex flex-col gap-4 overflow-x-clip border-white/25  lg:w-1/2 p-3 rounded-lg h-auto max-h-[470px] overflow-y-scroll"
                            dataLength={commentData.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={
                                <div className="flex justify-center mt-5 items-center">
                                    <ClipLoader color="#fff" size={30} />
                                </div>
                            }
                        >
                            {commentData.map((comment: comment) => (
                                <div className="flex gap-4" key={comment?._id}>
                                    {userData[comment.userId]?.profilePicture === "" ? <div className="h-12 w-12 bg-white text-black font-bold text-lg rounded-full justify-center flex items-center">{userData[comment.userId]?.username[0]?.toUpperCase()}</div> : <img src={userData[comment?.userId]?.profilePicture} className="h-12 w-12 rounded-full font-semibold justify-center flex items-center" />}
                                    <div className="flex flex-col">
                                        <div className="flex w-full items-center">
                                            <div className="flex gap-3 items-center">
                                                <h1 className="opacity-70 font-semibold text-sm">@{userData[comment?.userId] ? userData[comment?.userId]?.username : "User"}</h1>
                                                <h1 className=" opacity-70 text-xs font-semibold">{formatTimestamp(comment?.timestamp)}</h1>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h1 className="text-sm md:text-lg font-medium">{comment?.text}</h1>
                                            <div className="flex gap-5 items-center">
                                                {showClipboardIcon ? <Clipboard size={20} onClick={() => handleCopyToClipboard(comment?.text)} className="cursor-pointer" /> : <ClipboardPaste size={20} className=" cursor-pointer" />}
                                                {userId && comment.userId !== undefined && ((typeof comment.userId === "number" && userId !== null) || (typeof comment.userId === "string" && comment.userId === userId.toString())) && <Trash size={20} className="cursor-pointer" onClick={() => handleDeleteComment(comment?._id)} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentSection;
