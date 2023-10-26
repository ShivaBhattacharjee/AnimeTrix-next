"use client"
import SpinLoading from "@/components/loading/SpinLoading";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
    const [tokenExistOrNot, settokenExistOrNot] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const token = getCookie("token")
    function checkIfTokenExistOrNot() {
        if (token === undefined || token === null || token.length === 0) {
            settokenExistOrNot(false);
        } else {
            settokenExistOrNot(true);
        }
    }

    const getUserHistory = async () => {
        try {
            const Response = await fetch('/api/history');
            if (token) {
                if (!Response.ok) {
                    Toast.ErrorShowToast("There seems to be an issue with network response.");
                }
            }
            const history = await Response.json();
            setData(history?.userHistory?.history || [])
            console.log(history)
            setLoading(false)
        } catch (error: unknown) {
            const Error = error as Error
            setLoading(false)
            console.error(error)
            Toast.ErrorShowToast(Error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        checkIfTokenExistOrNot();
        if (token) getUserHistory()
    }, [token]);

    return (
        <div className=" min-h-screen">
            {
                tokenExistOrNot ? (
                    <>
                        {
                            loading ? (
                                <div className="flex justify-center items-center min-h-screen"><SpinLoading /></div>
                            ) : (
                                <>
                                    {
                                        history.length > 0 ? (
                                            <h1>Nigga feature under dev</h1>
                                        ) : (
                                            <h2>Something went wrong</h2>
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                ) : (
                    <div className="flex flex-col  font-semibold gap-4 justify-center items-center min-h-[80vh]">
                        <p className=" text-2xl">Login to access history</p>
                        <Link href="/login" className=" p-4 bg-white font-bold w-48 text-center  text-black rounded-lg">Login</Link>
                    </div>
                )
            }
        </div>
    );
};

export default page;
