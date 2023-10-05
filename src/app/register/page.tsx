"use client"
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import useDebounce from '@/hooks/debounce';

const Page = () => {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

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
        <section className='flex min-h-[80vh] justify-center items-center'>
            <div className=' bg-white/20 shadow-md  shadow-white/70 w-full md:w-1/3 m-4 md:m-auto p-4 rounded-lg'>
                <h1 className='font-semibold text-2xl text-center mb-5'>Onboarding</h1>
                <form autoComplete='false' className="flex flex-col gap-2">
                    <label htmlFor="text">Username</label>
                    <input type="text" placeholder='Username' className=' bg-transparent border-2 border-white/20 p-2 focus:outline-none  rounded-lg text-white' onChange={(e) => setUserName(e.target.value)} />
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder='Email' className=' bg-transparent border-2 border-white/20 p-2 focus:outline-none  rounded-lg text-white' onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="Password">Password</label>
                    <div className={`flex justify-between items-center border-2 rounded-lg  ${passwordMismatch ? 'border-red-500' : "border-white/20"} p-2 `}>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            placeholder='Password'
                            className="w-[90%] bg-transparent focus:outline-none "
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <Eye onClick={() => setShowPassword(!showPassword)} />}
                    </div>

                    <label htmlFor="password">Confirm Password</label>
                    <div className={`flex justify-between items-center border-2 rounded-lg  ${passwordMismatch ? 'border-red-500' : "border-white/20"} p-2 `}>
                        <input
                            type={`${showConfirmPassword ? 'text' : 'password'}`}
                            placeholder='Password'
                            className=' w-[90%] bg-transparent focus:outline-none'
                            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        />
                        {showConfirmPassword ? <EyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                    </div>
                    {passwordMismatch && <span className='text-red-500 font-semibold'>Password Didn&apos;t Match</span>}
                    <button className={` p-3 ${userName && email && password && confirmPassword != "" && password === confirmPassword ? "bg-blue-600 cursor-pointer" : "bg-white/30 text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 hover:bg-white hover:text-black`} disabled={userName && email && password && confirmPassword != "" && password ? false : true}>Register</button>
                    <span className=' text-center mt-2'>Already have an account? <Link href={"/login"} className=' text-blue-500 '>Login</Link></span>
                </form>
            </div>
        </section>
    );
};

export default Page;
