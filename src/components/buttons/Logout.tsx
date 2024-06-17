"use client";

import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

import UserContext from "@/context/getUserDetails";

const Logout = () => {
    const { loading, tokenExistOrNot, username, profilePicture } = useContext(UserContext);
    return (
        <>
            {tokenExistOrNot ? (
                <>
                    {loading ? (
                        <ClipLoader color="#fff" size={30} />
                    ) : (
                        <Link href={"/profile"} className="bg-white rounded-full text-black font-bold w-10 h-10 text-center flex items-center justify-center">
                            {profilePicture ? <img src={profilePicture} alt="profile" className="rounded-full" /> : <p className=" p-2">{username?.charAt(0)?.toUpperCase() || "?"}</p>}
                        </Link>
                    )}
                </>
            ) : (
                <Link href="/login" className="bg-white text-black   hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32">
                    Login
                </Link>
            )}
        </>
    );
};

export default Logout;
