"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Toast from '@/utils/toast';
import SpinLoading from '@/components/loading/SpinLoading';
import { getCookie } from 'cookies-next';
import { Error } from '@/types/ErrorTypes';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
const Page = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const token = getCookie("token")
    const logout = async () => {
        try {
            await axios.get('/api/logout')
            Toast.SuccessshowToast("Logout Successfull")
            router.refresh();
            router.push("/")
        } catch (error: unknown) {
            const Error = error as Error
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong")
        }
    }
    const getUserData = async () => {
        try {
            const userResponse = await fetch('/api/get-users');
            const user = await userResponse.json();
            setUserName(user?.userData?.username);
            setEmail(user?.userData?.email);
            setLoading(false)
        } catch (error: unknown) {
            const Error = error as Error
            setLoading(false)
            Toast.ErrorShowToast(Error?.message || "Something went wrong");
        }
    };
    useEffect(() => {
        getUserData()
    }, [token])
    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-[100dvh]">
                        <SpinLoading />
                    </div>
                ) : (
                    <div className='min-h-[100dvh]'>
                        <div className=' p-4 flex flex-col lg:flex-row gap-3 items-center justify-between'>
                            <div className='flex flex-col lg:flex-row items-center gap-5'>
                                <div className=' h-24 w-24 lg:h-32 lg:w-32 rounded-full dark:bg-white bg-black dark:text-black text-white flex justify-center items-center '>
                                    <h1 className=' font-bold text-4xl'>{userName?.charAt(0).toUpperCase()}</h1>
                                </div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <h1 className='text-3xl font-semibold'>{userName}</h1>
                                    <span className=' opacity-70 tracking-wide'>{email || "Unknown"}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={"/edit-profile"} className=' dark:bg-white bg-black p-3 dark:text-black text-white rounded-full font-semibold dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white'>Manage Account</Link>
                                <button onClick={logout} className='dark:bg-white/80 bg-black/80 dark:text-black text-white p-3 rounded-lg dark:hover:bg-transparent duration-200 dark:hover:text-white hover:scale-110'><LogOut /></button>
                            </div>
                        </div>
                        <h1 className=' h-1 dark:bg-white/20 bg-black/20 w-full'></h1>

                        <div className="flex flex-col p-5">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl lg:text-5xl font-bold">History</h1>
                                <Link href={"/history"} className="text-sm lg:text-lg">
                                    Load more
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                {/* <Cards props={Popular} /> */}
                            </div>
                        </div>

                        <div className="flex flex-col p-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl lg:text-5xl font-bold">Bookmark</h1>
                                <Link href={"/bookmark"} className="text-sm lg:text-lg">
                                    Load more
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                {/* <Cards props={Popular} /> */}
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Page