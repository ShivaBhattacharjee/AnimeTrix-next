"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";
import { StickyNote, ThumbsDown, ThumbsUp, Trash } from "lucide-react";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
type props = {
    streamId: string;
};

const CommentSection = ({ streamId }: props) => {
    const token = getCookie("token");
    const [comment, setComment] = useState<string>("");
    const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
    const [commentData, setCommentData] = useState([]);
    const [userId, setUserId] = useState<string>("");
    const [commenterId, setCommenterId] = useState<string[]>([]);
    const [userData, setUserData] = useState<{ [key: string]: { username: string; profilePicture: string } }>({});

    const HandleaddComment = async () => {
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

    const getComment = async () => {
        try {
            const res = await axios.get(`/api/comment?streamId=${streamId}&page=1`);
            const comments = res?.data?.comment?.comments || [];
            setCommentData(comments);
            const userIds = comments.map((comment: comment) => comment.userId) || [];
            setCommenterId(userIds);

            // Fetch user information for each user ID
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

            // Update user data state
            setUserData(Object.assign({}, ...usersData));
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const getUserData = async () => {
        try {
            const userResponse = await fetch("/api/get-users");
            if (token && !userResponse.ok) {
                Toast.ErrorShowToast("There seems to be an issue with the network response.");
            }
            const user = await userResponse.json();
            console.log(user);
            setUserId(user?.userData?._id);
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg?.response?.data?.error || "Something went wrong");
        }
    };

    useEffect(() => {
        getComment();
        if (token) {
            getUserData();
        }
    }, []);

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

    type comment = {
        text: string;
        timestamp: Date;
        userId: number;
        _id: number;
    };
    const formatTimestamp = (timestamp: Date) => {
        const currentDate = new Date();
        const commentDate = new Date(timestamp);
        const timeDifference = currentDate.getTime() - commentDate.getTime();

        // Convert milliseconds to seconds
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

    return (
        <>
            <div className="flex flex-col gap-3 mt-4">
                <h1 className="text-3xl font-semibold">Comments</h1>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" className="p-2 w-full lg:w-1/2 rounded-lg h-20 bg-transparent border border-white/25 focus:outline-none"></textarea>
                <button className=" text-xl bg-white p-4 rounded-lg w-1/2 justify-center flex items-center gap-3 md:w-44 text-black font-semibold" onClick={HandleaddComment}>
                    {addCommentLoading && <ClipLoader size={20} color="#000" />}
                    {addCommentLoading ? "Adding" : "Add Comment"}
                </button>

                {commentData?.length == 0 || comment === undefined ? (
                    <h1 className=" text-3xl font-semibold items-center mt-5 rounded-lg lg:w-1/2 flex gap-3 ">
                        <StickyNote />
                        Be the first to comment
                    </h1>
                ) : (
                    <div className=" mt-4 relative grid gap-4 border-2 overflow-x-clip border-white/25 w-full lg:w-1/2 p-3 rounded-lg h-auto max-h-96 overflow-y-scroll">
                        {commentData.map((comment: comment) => (
                            <div className="flex gap-4" key={comment?._id}>
                                {userData[comment.userId]?.profilePicture === "" ? <div className="h-12 w-12 rounded-full font-semibold justify-center flex items-center">{userData[comment.userId]?.username[0]?.toUpperCase()}</div> : <img src={userData[comment?.userId]?.profilePicture} className="h-12 w-12 rounded-full font-semibold justify-center flex items-center" />}
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
                                            <ThumbsUp size={20} onClick={() => Toast.ErrorShowToast("Under development")} />
                                            <ThumbsDown size={20} onClick={() => Toast.ErrorShowToast("Under Development")} />
                                            {commenterId?.includes(userId) && <Trash size={20} className=" cursor-pointer" onClick={() => handleDeleteComment(comment?._id)} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentSection;
