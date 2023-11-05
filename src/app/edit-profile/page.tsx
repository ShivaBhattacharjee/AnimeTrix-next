"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Camera, Check } from "lucide-react";

import SpinLoading from "@/components/loading/SpinLoading";
import AvatarModal from "@/components/shared/AvatarModal";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const Page = () => {
    const token = getCookie("token");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [loading, setLoading] = useState(true);
    const [userDescription, setUserDescription] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [openAvatarModal, setOpenAvatarModal] = useState(false);
    const getUserData = async () => {
        try {
            const userResponse = await fetch("/api/get-users");
            const user = await userResponse.json();
            setUserName(user?.userData?.username);
            setEmail(user?.userData?.email);
            setProfilePicture(user?.userData?.profilePicture || "");
            setUserDescription(user?.userData?.userDescription || "");
            setLoading(false);
            setIsProfileUpdated(false);
        } catch (error: unknown) {
            const Error = error as Error;
            setLoading(false);
            Toast.ErrorShowToast(Error?.message || "Something went wrong");
        }
    };
    useEffect(() => {
        if (token) getUserData();
    }, [token]);

    const UpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            username: userName,
            profilePicture: profilePicture,
            userDescription: userDescription,
        };

        try {
            if (isProfileUpdated) {
                const res = await axios.put("/api/get-users", userData);
                setIsProfileUpdated(false);
                window.location.reload();
                if (res) {
                    Toast.SuccessshowToast("Profile Updated");
                } else {
                    Toast.ErrorShowToast("Something went wrong");
                }
            } else {
                Toast.ErrorShowToast("Nothing to update");
            }
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg?.response?.data?.error || "Something went wrong");
            console.log(error);
        }
    };
    const handleSelectProfilePicture = (url: string) => {
        setProfilePicture(url);
        setIsProfileUpdated(true);
    };
    return (
        <>
            {loading ? (
                <div className=" min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <form onSubmit={UpdateProfile} className="flex flex-col gap-4 p-4 overflow-y-hidden min-h-screen">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <span className=" w-full h-[1px] bg-white/20"></span>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                        <div onClick={() => setOpenAvatarModal(true)} className="h-24 cursor-pointer w-24 relative lg:h-32 lg:w-32 rounded-full bg-white  text-black  flex justify-center items-center ">
                            {profilePicture ? <img src={profilePicture} alt="profile" className="rounded-full" /> : <p className=" p-2 font-semibold text-3xl">{userName?.charAt(0).toUpperCase()}</p>}
                            <div className="absolute bg-white cursor-pointer p-2 rounded-full right-0 bottom-0">
                                <Camera size={20} />
                            </div>
                        </div>

                        <AvatarModal onSelectProfilePicture={handleSelectProfilePicture} openAvatarModal={openAvatarModal} setOpenAvatarModal={setOpenAvatarModal} />

                        <div className="flex flex-col gap-3 lg:w-[80%]">
                            <label htmlFor="username" className=" font-semibold text-2xl">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className=" p-3 bg-transparent border-[1px] rounded-lg border-white/20 focus:outline-none"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    setIsProfileUpdated(true);
                                }}
                            />

                            <label htmlFor="Email" className=" font-semibold text-2xl">
                                Email
                            </label>
                            <input type="email" placeholder="Username" className=" p-3 bg-transparent border-[1px] rounded-lg border-white/20 focus:outline-none text-white/60" value={email} disabled={true} />

                            <label htmlFor="Email" className=" font-semibold text-2xl">
                                Bio
                            </label>
                            <textarea
                                placeholder="Let us a title about yourself"
                                className=" bg-transparent border p-3 rounded-lg focus:outline-none border-white/20"
                                value={userDescription}
                                onChange={(e) => {
                                    setUserDescription(e.target.value);
                                    setIsProfileUpdated(true);
                                }}
                            />
                            <button className={`flex justify-center items-center gap-4 ${isProfileUpdated ? "bg-white text-black" : "bg-white/40 "} p-4 rounded-lg  font-semibold w-full mt-5 lg:w-56`} disabled={!isProfileUpdated}>
                                <Check />
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default Page;
