"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Toast from '@/utils/toast';
import SpinLoading from '@/components/loading/SpinLoading';
import { LoginAndRegisterContext } from '@/context/LoginAndRegisterContext';
const Page = () => {
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/logout')
            Toast.SuccessshowToast("Logout Successfull")
            router.refresh();
            router.push("/")
        } catch (error: any) {
            Toast.ErrorShowToast(error?.response?.data?.error || "Something went wrong")
        }
    }
    const getUserData = async () => {
        try {
            const userResponse = await fetch('/api/get-users');
            if (!userResponse.ok) {
                alert("Network response was not ok");
            }
            const user = await userResponse.json();
            setUserName(user?.userData?.username);
            console.log(user?.userData?.username);
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            Toast.ErrorShowToast(error.message || "Something went wrong");
        }
    };
    useEffect(() => {
        getUserData()
    }, [])
    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center min-h-[50dvh]">
                        <SpinLoading />
                    </div>
                ) : (
                    <div className=' flex justify-center items-center flex-col min-h-[50dvh] text-white'>
                        <h1>This is profile page</h1>
                        <h2>username : {userName} </h2>
                        <button className=' bg-white p-2 font-semibold w-32 mt-5 rounded-lg text-black duration-200 hover:bg-transparent border-white hover:border-2 hover:text-white' onClick={logout}>Logout</button>
                    </div>
                )
            }
        </>

    )
}

export default Page