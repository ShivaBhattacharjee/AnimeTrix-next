"use client";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
type props = {
    streamId: string;
};
const CommentSection = ({ streamId }: props) => {
    const token = getCookie("token");
    const [comment, setComment] = useState<string>("");
    const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
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
    return (
        <>
            <div className="flex flex-col gap-3 mt-4">
                <h1 className="text-3xl font-semibold">Comments</h1>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" className="p-2 w-full lg:w-1/2 rounded-lg h-20 bg-transparent border border-white/25 focus:outline-none"></textarea>
                <button className=" text-xl bg-white p-4 rounded-lg w-1/2 justify-center flex items-center gap-3 md:w-44 text-black font-semibold" onClick={HandleaddComment}>
                    {addCommentLoading && <ClipLoader size={20} color="#000" />}
                    {addCommentLoading ? "Adding" : "Add Comment"}
                </button>
            </div>
        </>
    );
};

export default CommentSection;
