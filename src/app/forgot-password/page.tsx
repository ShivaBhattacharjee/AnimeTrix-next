"use client";

import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userData = {
                email: email,
            };
            const response = await axios.post("/api/forgot-password", userData);
            console.log(response);
            Toast.SuccessshowToast(response.data.message || "Email to reset password sent");
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Link href={"/login"} className=" font-bold text-lg p-4 flex items-center gap-2">
                <ArrowLeft />
                <h1>Back</h1>
            </Link>

            <section className="flex min-h-[70vh] justify-center items-center">
                <div className=" bg-black/20 dark:bg-white/20 shadow-md shadow-black/70 dark:shadow-white/70 w-full md:w-1/2 2xl:w-1/3 m-4 md:m-auto p-4 rounded-lg">
                    <h1 className="font-semibold text-2xl text-center mb-5">Lets recover whats lost</h1>
                    <form autoComplete="false" className="flex flex-col gap-2" onSubmit={handleResetPassword}>
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className=" bg-transparent border-2 dark:border-white/20 border-black/20 p-2 focus:outline-none  rounded-lg dark:text-white text-black" autoComplete="off" />
                        {loading ? (
                            <button className=" font-semibold flex gap-3 p-3  bg-white text-black rounded-lg items-center justify-center" disabled={true}>
                                <ClockLoader size={30} />
                                <span>Sending...</span>
                            </button>
                        ) : (
                            <button className={` p-3 ${email != "" ? "bg-blue-600 cursor-pointer" : "dark:bg-white/30 bg-black/30 dark:text-black text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${email != "" && "hover:bg-white"} hover:text-black`} disabled={email != "" ? false : true}>
                                Send Email
                            </button>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
};

export default Page;
