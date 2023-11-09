"use client";
import React from "react";
import { getCookie } from "cookies-next";

import Toast from "@/utils/toast";
const CommentSection = () => {
    const token = getCookie("token");
    return (
        <>
            {token && (
                <div className="flex flex-col gap-3 mt-4">
                    <h1 className="text-3xl font-semibold">Comments</h1>
                    <div className="flex gap-3 items-center flex-wrap">
                        <textarea placeholder="Add a comment" className="p-2 w-full lg:w-1/2 rounded-lg h-20 bg-transparent border border-white/25 focus:outline-none"></textarea>
                        <button className=" bg-white p-4 rounded-lg w-1/3 md:w-44 text-black font-semibold" onClick={() => Toast.ErrorShowToast("Under Development")}>
                            Comment
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentSection;
