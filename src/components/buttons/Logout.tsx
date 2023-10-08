"use client"
import Toast from '@/utils/toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getCookie } from "cookies-next"
import { useRouter } from 'next/navigation';

const Logout = () => {

    const router = useRouter()

    const token = getCookie("token");

    const [tokenExistOrNot, settokenExistOrNot] = useState(false)

    async function checkIfTokenExistOrNot() {
        if (token === undefined || token === null || token.length === 0) {
            return settokenExistOrNot(false);
        }
        return settokenExistOrNot(true);
    }

    useEffect(() => {
        checkIfTokenExistOrNot();
    }, [token])


    return (
        <>
            {tokenExistOrNot ? (
                <Link href={"/profile"} className="bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32">
                    Profile
                </Link>
            ) : (
                <Link href="/login" className='bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32'>Login</Link>
            )}

        </>
    )
}

export default Logout