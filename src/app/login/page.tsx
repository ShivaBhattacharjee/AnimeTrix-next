"use client"
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className='flex min-h-[70vh] justify-center items-center'>
            <div className=' bg-white/20 w-full md:w-1/2 m-4 md:m-auto p-4 rounded-lg'>
                <h1 className='font-semibold text-2xl text-center mb-5'>Welcome Back</h1>
                <form autoComplete='false' className="flex flex-col gap-2">
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder='Email' className=' bg-transparent border-2 border-white/20 p-2 focus:outline-none rounded-lg text-white' />
                    <label htmlFor="Password">Password</label>
                    <div className="flex justify-between items-center border-2 rounded-lg border-white/20 p-2 ">
                        <input type={`${showPassword ? "text" : "password"}`} placeholder='Password' className=' w-[90%] bg-transparent focus:outline-none' />
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
                            <input type="checkbox" className=' focus:ring-white' />Remember Me
                        </div>
                        <span className=' text-blue-500'>Forgot Password?</span>
                    </div>
                    <button className=' p-3 bg-blue-500 rounded-lg mt-3 font-semibold duration-200 hover:bg-white hover:text-black hover:font-semibold'>Login</button>
                    <span className=' text-center mt-2'>Dont have an account? <span className=' text-blue-500 '>Signup</span></span>
                </form>
            </div>
        </section>
    )
}

export default Page