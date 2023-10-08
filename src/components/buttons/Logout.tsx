"use client"
import Toast from '@/utils/toast'
import axios from 'axios'
import React from 'react'
import Link from 'next/link';
import { getCookie } from "cookies-next"
const Logout = () => {
    const token = getCookie("token");
    const logout = async () => {
        try {
            await axios.get('/api/logout')
            Toast.SuccessshowToast("Logout Successfull")
        } catch (error: any) {
            Toast.ErrorShowToast(error?.response?.data?.error || "Something went wrong")
        }
    }

    console.log("Token is " + token)
    return (
        <>
            {
                token !== undefined || token !== null ? (
                    <button className="bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <Link href={"/login"} className='bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32'>Login</Link>
                )
            }
        </>
    )
}

export default Logout