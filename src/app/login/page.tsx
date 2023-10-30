"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import Toast from "@/utils/toast";
import { Error } from "@/types/ErrorTypes";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const loginData = {
                email: email,
                password: password,
            };
            const response = await axios.post(`/api/login`, loginData);
            Toast.SuccessshowToast(response?.data?.message || "Login Successfull with some server side error");
            console.log(response);
            router.push("/");
            router.refresh();
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-[70vh] justify-center items-center">
            <div className=" bg-black/20 dark:bg-white/20 shadow-md shadow-black/70 dark:shadow-white/70 w-full md:w-1/2 2xl:w-1/3 m-4 md:m-auto p-4 rounded-lg">
                <h1 className="font-semibold text-2xl text-center mb-5">Welcome Back</h1>
                <form autoComplete="false" className="flex flex-col gap-2" onSubmit={handleLogin}>
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className=" bg-transparent fill-none border-2 border-black/20 dark:border-white/20 p-2 focus:outline-none  rounded-lg dark:text-white text-black" autoComplete="off" />
                    <label htmlFor="Password">Password</label>
                    <div className="flex justify-between fill-none items-center border-2 rounded-lg dark:border-white/20 border-black/20 p-2 ">
                        <input type={`${showPassword ? "text" : "password"}`} placeholder="Password" className=" w-[90%] bg-transparent focus:outline-none" onChange={(e) => setPassword(e.target.value)} />
                        {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <Eye onClick={() => setShowPassword(!showPassword)} />}
                    </div>
                    {password.length < 0 && <span className=" text-red-500">Password should have alteast 8 characters</span>}
                    <div className="flex justify-start mt-3">
                        <Link href={"/forgot-password"} className=" text-blue-500">
                            Forgot Password?
                        </Link>
                    </div>
                    {loading ? (
                        <button className=" font-semibold flex gap-3 p-3  bg-white text-black rounded-lg items-center justify-center" disabled={true}>
                            <ClockLoader size={30} />
                            <span>Onboarding...</span>
                        </button>
                    ) : (
                        <button className={` p-3 ${email && password != "" ? "bg-blue-600 cursor-pointer" : "dark:bg-white/30 bg-black/30 dark:text-black text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${email && password != "" && "hover:bg-white"} hover:text-black`} disabled={email && password != "" ? false : true}>
                            Login
                        </button>
                    )}
                    <span className=" text-center mt-2">
                        Dont have an account?{" "}
                        <Link href={"/register"} className=" text-blue-500 ">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </section>
    );
};

export default Page;
