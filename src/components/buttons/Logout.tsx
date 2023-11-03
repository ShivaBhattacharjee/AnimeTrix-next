"use client"
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { getCookie } from "cookies-next"
import Link from 'next/link';

import { Error } from '@/types/ErrorTypes';
import Toast from '@/utils/toast'
const Logout = () => {
    const token = getCookie("token");
    const [profilePicture, setProfilePicture] = useState("")
    const [tokenExistOrNot, settokenExistOrNot] = useState(false)
    const [username, setUserName] = useState("")
    const [loading, setLoading] = useState(true)
    function checkIfTokenExistOrNot() {
        if (token === undefined || token === null || token.length === 0) {
            settokenExistOrNot(false);
        } else {
            settokenExistOrNot(true);
        }
    }
    const getUserData = async () => {
        try {
            const userResponse = await fetch('/api/get-users');
            if (token) {
                if (!userResponse.ok) {
                    Toast.ErrorShowToast("There seems to be an issue with network response.");
                }
            }
            const user = await userResponse.json();
            setUserName(user?.userData?.username?.charAt(0).toUpperCase());
            setProfilePicture(user?.userData?.profilePicture)
            setLoading(false)
        } catch (error: unknown) {
            const Error = error as Error
            setLoading(false)
            Toast.ErrorShowToast(Error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        checkIfTokenExistOrNot();
        if (token) getUserData();
    }, [token]);


    return (
        <>
            {tokenExistOrNot ? (
                <>
                    {
                        loading ? (
                            <ClipLoader color='#fff' size={30} />
                        ) : (
                            <>
                                <Link href={"/profile"} className=" dark:bg-white bg-black text-white rounded-full dark:text-black font-bold w-10 h-10 p-2 text-center flex items-center justify-center">
                                    {
                                        profilePicture != null ? (
                                            <p>{username}</p>
                                        ) : (
                                            <p>P</p>
                                        )
                                    }
                                </Link>
                            </>
                        )
                    }
                </>
            ) : (
                <Link href="/login" className='dark:bg-white dark:text-black bg-black text-white dark:hover:text-white dark:hover:bg-transparent duration-150 border-white dark:hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32'>Login</Link>
            )}

        </>
    )
}

export default Logout