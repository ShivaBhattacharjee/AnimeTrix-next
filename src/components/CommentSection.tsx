"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";
import { StickyNote } from "lucide-react";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
type props = {
    streamId: string;
};
const CommentSection = ({ streamId }: props) => {
    const token = getCookie("token");
    const [comment, setComment] = useState<string>("");
    const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
    const [commentData, setCommentData] = useState([]); // [
    const HandleaddComment = async () => {
        const commentData = {
            streamId: streamId,
            text: comment,
        };
        if (token) {
            if (comment.length < 1) return Toast.ErrorShowToast("Comment should have atleast 1 character");
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
            console.log(res);
            setCommentData(res?.data?.comments?.comments);
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            console.log(ErrorMsg?.response?.data?.error || "Something went wrong");
        }
    };
    useEffect(() => {
        getComment();
    }, []);
    type comment = {
        text: string;
        timestamp: string;
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

                {commentData.length == 0 || comment === undefined ? (
                    <h1 className=" text-3xl font-semibold items-center mt-5 rounded-lg lg:w-1/2 flex gap-3 ">
                        <StickyNote />
                        Be first to comment
                    </h1>
                ) : (
                    <div className=" mt-4 grid gap-4 border-2 overflow-x-clip border-white/25 w-full lg:w-1/2 p-3 rounded-lg h-auto max-h-96 overflow-y-scroll">
                        {commentData.map((comment: comment) => (
                            <div className="flex gap-4" key={comment?.timestamp}>
                                <div className=" h-16 w-16 flex text-black items-center justify-center font-semibold bg-white rounded-full">U</div>
                                <div className="flex flex-col">
                                    <h1 className=" opacity-70 font-semibold">User</h1>
                                    <h1 className="max-w-[16rem] lg:w-[40rem] font-semibold">{comment?.text}</h1>
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
