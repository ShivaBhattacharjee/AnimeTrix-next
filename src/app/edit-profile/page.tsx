"use client";

import SpinLoading from "@/components/loading/SpinLoading";
import Toast from "@/utils/toast";
import { getCookie } from "cookies-next";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
    const token = getCookie("token");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [loading, setLoading] = useState(true);
    const [userDescription, setUserDescription] = useState("");
    const getUserData = async () => {
        try {
            const userResponse = await fetch("/api/get-users");
            const user = await userResponse.json();
            setUserName(user?.userData?.username);
            setEmail(user?.userData?.email);
            setProfilePicture(user?.userData?.profilePicture || "");
            setUserDescription(user?.userData?.userDescription || "");
            setLoading(false);
        } catch (error: unknown) {
            const Error = error as Error;
            setLoading(false);
            Toast.ErrorShowToast(Error?.message || "Something went wrong");
        }
    };
    useEffect(() => {
        if (token) getUserData();
    }, []);

    // const UpdateProfile = async () => {
    //     const userData = {
    //         username: userName,
    //         profilePicture: profilePicture,
    //         userDescription: "",
    //     };
    // };
    return (
        <>
            {loading ? (
                <div className=" min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <div className="flex flex-col gap-4 p-4 min-h-screen">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <span className=" w-full h-[1px] bg-white/20"></span>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                        <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-white  text-black  flex justify-center items-center ">{profilePicture ? <img src={profilePicture} alt="profile" className="rounded-full" /> : <p className=" p-2 font-semibold text-3xl">{userName?.charAt(0).toUpperCase()}</p>}</div>
                        <div className="flex flex-col gap-3 lg:w-[80%]">
                            <label htmlFor="username" className=" font-semibold text-2xl">
                                Username
                            </label>
                            <input type="text" placeholder="Username" className=" p-3 bg-transparent border-[1px] rounded-lg border-white/20 focus:outline-none" value={userName} onChange={(e) => setUserName(e.target.value)} />

                            <label htmlFor="Email" className=" font-semibold text-2xl">
                                Email
                            </label>
                            <input type="email" placeholder="Username" className=" p-3 bg-transparent border-[1px] rounded-lg border-white/20 focus:outline-none text-white/60" value={email} disabled={true} />

                            <label htmlFor="Email" className=" font-semibold text-2xl">
                                Bio
                            </label>
                            <textarea name="" id="" placeholder="Let us a title about yourself" className=" bg-transparent border p-3 rounded-lg focus:outline-none border-white/20" value={userDescription} onChange={(e) => setUserDescription(e.target.value)} />
                            <button onClick={() => Toast.ErrorShowToast("Under development brother")} className=" flex justify-center items-center gap-4 bg-white p-4 rounded-lg text-black font-semibold w-full mt-5 lg:w-56">
                                <Check />
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
