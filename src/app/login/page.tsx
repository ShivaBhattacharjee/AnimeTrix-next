"use client"
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [loginUser, setLoginUser] = useState<object>({
        email: email,
        password: password
    })

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        alert("Login Under Development")
    }

    return (
        <section className='flex min-h-[70vh] justify-center items-center'>
            <div className=' bg-white/20 shadow-md shadow-white/70 w-full md:w-1/2 2xl:w-1/3 m-4 md:m-auto p-4 rounded-lg'>
                <h1 className='font-semibold text-2xl text-center mb-5'>Welcome Back</h1>
                <form autoComplete='false' className="flex flex-col gap-2" onSubmit={handleLogin}>
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className=' bg-transparent border-2 border-white/20 p-2 focus:outline-none  rounded-lg text-white' />
                    <label htmlFor="Password">Password</label>
                    <div className="flex justify-between items-center border-2 rounded-lg border-white/20 p-2 ">
                        <input type={`${showPassword ? "text" : "password"}`} placeholder='Password' className=' w-[90%] bg-transparent focus:outline-none' onChange={(e) => setPassword(e.target.value)} />
                        {
                            showPassword ? (
                                <EyeOff onClick={() => setShowPassword(!showPassword)} />

                            ) : (
                                <Eye onClick={() => setShowPassword(!showPassword)} />
                            )
                        }
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div className=' gap-2 flex items-center'>
                            <input type="checkbox" className=' focus:ring-white' checked={true} />Remember Me
                        </div>
                        <Link href={"/forgot-password"} className=' text-blue-500'>Forgot Password?</Link>
                    </div>
                    <button className={`p-3  rounded-lg mt-3 font-semibold duration-200 ${email && password != "" ? "cursor-not-allowed bg-white/30 text-black" : "hover:bg-white bg-blue-500 hover:text-black"} `} disabled={email && password != "" ? false : true}>Login</button>
                    <span className=' text-center mt-2'>Dont have an account? <Link href={"/register"} className=' text-blue-500 '>Signup</Link></span>
                </form>
            </div>
        </section>
    )
}

export default Page