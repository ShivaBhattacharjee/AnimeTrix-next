"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Toast from '@/utils/toast';
const Page = () => {
    const [userName, setUserName] = useState("")
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
            const user = await axios('/api/get-users')
            setUserName(user?.data?.userData?.username)
            console.log(user?.data)
        } catch (error: any) {
            Toast.ErrorShowToast(error?.response?.data?.error || "Something went wrong")
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div className=' flex justify-center items-center flex-col min-h-screen text-white'>
            <h1>This is profile page</h1>
            <h2>username : {userName} </h2>
            <button className=' bg-white p-2 font-semibold w-32 mt-5 rounded-lg text-black duration-200 hover:bg-transparent border-white hover:border-2 hover:text-white' onClick={logout}>Logout</button>
        </div>

    )
}

export default Page