"use client"

import React, { useEffect, useState } from 'react'
import { ClockLoader } from 'react-spinners'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

import useDebounce from '@/hooks/debounce'
import { Error } from "@/types/ErrorTypes"
import Toast from '@/utils/toast'

const Page = () => {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, []);

    const handleVerifyResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const userData = {
                token: token,
                password: password
            }
            const response = await axios.post("/api/verifyForgotPassword", userData)
            Toast.SuccessshowToast(response.data.message || "Reset Successfull")
            router.push("/login")
        } catch (error: unknown) {
            console.log(error)
            const Error = error as Error
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    const handlePasswordChange = useDebounce((value) => {
        setPassword(value);
        if (confirmPassword && confirmPassword !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    }, 800);

    const handleConfirmPasswordChange = useDebounce((value) => {
        setConfirmPassword(value);
        if (password && password !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    }, 800);
    return (
        <>

            {
                token ? (
                    <section className='flex min-h-[70vh] justify-center items-center'>
                        <div className=' bg-white/20 shadow-md shadow-white/70 w-full md:w-1/2 2xl:w-1/3 m-4 md:m-auto p-4 rounded-lg'>
                            <h1 className='font-semibold text-2xl text-center mb-5'>Reset Password</h1>
                            <form autoComplete='false' className="flex flex-col gap-2" onSubmit={handleVerifyResetPassword}>
                                <label htmlFor="Password">Password</label>
                                <div className={`flex justify-between items-center border-2 rounded-lg  ${passwordMismatch ? 'border-red-500' : "border-white/20"} p-2 `}>
                                    <input
                                        type={`${showPassword ? 'text' : 'password'}`}
                                        placeholder='Password should have alteast 8 characters'
                                        className="w-[90%] bg-transparent focus:outline-none "
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                    />
                                    {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <Eye onClick={() => setShowPassword(!showPassword)} />}
                                </div>

                                <label htmlFor="password">Confirm Password</label>
                                <div className={`flex justify-between items-center border-2 rounded-lg  ${passwordMismatch ? 'border-red-500' : "border-white/20"} p-2 `}>
                                    <input
                                        type={`${showConfirmPassword ? 'text' : 'password'}`}
                                        placeholder='Please confirm your password'
                                        className=' w-[90%] bg-transparent focus:outline-none'
                                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    />
                                    {showConfirmPassword ? <EyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                                </div>
                                {passwordMismatch && <span className='text-red-500 font-semibold'>Password Didn&apos;t Match</span>}
                                {
                                    password && confirmPassword.length < 8 && <span className='text-red-500 font-semibold'>Password should have alteast 8 characters</span>
                                }
                                {
                                    loading ? <button className=' font-semibold flex gap-3 p-3  bg-white text-black rounded-lg items-center justify-center' disabled={true}>
                                        <ClockLoader size={30} />
                                        <span>Resetting...</span>
                                    </button> : (
                                        <button className={` p-3 ${password && confirmPassword != "" && password === confirmPassword ? "bg-blue-600 cursor-pointer" : "bg-white/30 text-black cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${password && confirmPassword != "" && password && confirmPassword.length > 8 && password && "hover:bg-white"} hover:text-black`} disabled={password && confirmPassword != "" && password && confirmPassword.length > 8 && password ? false : true}>Reset</button>
                                    )
                                }
                            </form>
                        </div>
                    </section>
                ) : (
                    <h1 className='flex justify-center items-center min-h-screen text-red-500 text-3xl font-semibold animate-bounce duration-200'>No token found</h1>
                )
            }
        </>
    )
}

export default Page