"use client";

import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

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
                <Link href="/login">
                    <Button>
                        Login
                        <Icons.login className="ml-1 h-3.5 w-3.5" />
                    </Button>
                </Link>
            )}
        </>
    );
};

export default Logout;
