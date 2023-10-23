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
            Toast.ErrorShowToast(Error.message || "Something went wrong");
        }
    };
    useEffect(() => {
        getUserData()
    }, [token])
    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <SpinLoading />
                    </div>
                ) : (
                    <div className='min-h-[60vh]'>
                        <div className=' p-4 flex flex-col lg:flex-row gap-3 items-center justify-between'>
                            <div className='flex flex-col lg:flex-row items-center gap-5'>
                                <div className=' h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-white text-black flex justify-center items-center '>
                                    <h1 className=' font-bold text-4xl'>{userName.charAt(0).toUpperCase()}</h1>
                                </div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <h1 className='text-3xl font-semibold'>{userName}</h1>
                                    <span className=' opacity-70 tracking-wide'>{email || "Unknown"}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={"/edit-profile"} className=' bg-white p-3 text-black rounded-full font-semibold hover:bg-transparent hover:border-2 hover:border-white duration-200 hover:text-white'>Manage Account</Link>
                                <button onClick={logout} className='bg-white/80 text-black p-3 rounded-lg hover:bg-transparent duration-200 hover:text-white hover:scale-110'><LogOut /></button>
                            </div>
                        </div>
                        <h1 className=' h-1 bg-white/20 w-full'></h1>
                    </div>
                )
            }
        </>

    )
}

export default Page