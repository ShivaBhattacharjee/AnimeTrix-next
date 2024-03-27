"use client";

import React, { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ArrowLeft, Camera, Check } from "lucide-react";
import Link from "next/link";

import EditProfileLoading from "@/components/loading/EditProfileLoading";
import AvatarModal from "@/components/shared/AvatarModal";
import UserContext from "@/context/getUserDetails";
import { useProfile } from "@/hooks/useprofile";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const Page = () => {
    const { isProfileUpdated, setIsProfileUpdated } = useProfile();
    const [openAvatarModal, setOpenAvatarModal] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const { username, email, profilePicture, userDescription, loading, setUsername, setUserDescription, setProfilePicture } = useContext(UserContext);

    const UpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            username: username,
            profilePicture: profilePicture,
            userDescription: userDescription,
        };

        try {
            if (isProfileUpdated) {
                setEditLoading(true);
                const res = await axios.put("/api/get-users", userData);
                setIsProfileUpdated(false);
                if (res) {
                    Toast.SuccessshowToast("Profile Updated");
                } else {
                    Toast.ErrorShowToast("Something went wrong");
                }
            } else {
                Toast.ErrorShowToast("Nothing to update");
            }
        } catch (error: unknown) {
            setEditLoading(false);
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg?.response?.data?.error || "Something went wrong");
            console.log(error);
        } finally {
            setEditLoading(false);
        }
    };
    const handleSelectProfilePicture = async (url: string) => {
        setProfilePicture(url);
        try {
            const userData = {
                profilePicture: url,
            };
            const res = await axios.put("/api/get-users", userData);
            Toast.SuccessshowToast("Profile Picture Updated");
            console.log(res);
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg?.response?.data?.error || "Something went wrong");
            console.log(error);
        }
    };
    return (
        <>
            {loading ? (
                <EditProfileLoading />
            ) : (
                <>
                    <Link href={"/profile"} className=" font-bold text-lg p-4 flex items-center gap-2">
                        <ArrowLeft />
                        <h1>Back</h1>
                    </Link>
                    <form onSubmit={UpdateProfile} className="flex lg:w-[70%] lg:m-auto flex-col gap-4 p-4 overflow-y-hidden min-h-screen">
                        <h1 className="text-3xl font-bold">Profile</h1>
                        <span className=" w-full lg:w-[80%] h-[1px] bg-white/20"></span>
                        <div className="flex flex-col gap-5">
                            <div onClick={() => setOpenAvatarModal(true)} className="h-24 cursor-pointer w-24 relative lg:h-32 lg:w-32 rounded-full bg-white  text-black  flex justify-center items-center ">
                                {profilePicture ? <img src={profilePicture} alt="profile" className="rounded-full" /> : <p className=" p-2 font-semibold text-3xl">{username?.charAt(0).toUpperCase()}</p>}
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
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
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
                                <button className={`flex justify-center items-center gap-2 ${isProfileUpdated ? "bg-white text-black" : "bg-white/40 "} p-4 rounded-lg  font-semibold w-full mt-5 lg:w-1/3 `} disabled={!isProfileUpdated || editLoading}>
                                    {editLoading ? <ClipLoader size={20} color="#000" /> : <Check size={20} />}
                                    {editLoading ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default Page;
