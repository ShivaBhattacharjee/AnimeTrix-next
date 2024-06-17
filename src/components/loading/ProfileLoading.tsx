import { LogOut } from "lucide-react";
import Link from "next/link";

import LoadingSkeleton from "./LoadingSkeleton";
const ProfileLoading = () => {
    return (
        <div className="min-h-screen">
            <div className=" p-4 flex flex-col lg:flex-row gap-3 items-center justify-between">
                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <div className=" h-24 w-24 lg:h-32 relative lg:w-32 rounded-full bg-white/25 animate-pulse flex justify-center items-center "></div>
                    <div className="flex flex-col gap-3 items-center lg:items-start ">
                        <h1 className="text-3xl font-semibold bg-white/25 animate-pulse w-56 h-5"></h1>
                        <span className=" opacity-70 tracking-wide bg-white/25 animate-pulse w-56 h-5"></span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href={"/edit-profile"} className=" bg-white  p-3 text-black  rounded-full font-semibold hover:bg-transparent hover:border-2 hover:border-white duration-200 hover:text-white">
                        Manage Account
                    </Link>

                    <button className="bg-white/80 text-black  p-3 rounded-lg hover:bg-transparent duration-200 hover:text-white hover:scale-110">
                        <LogOut />
                    </button>
                </div>
            </div>
            <h1 className=" h-[1px] bg-white/20  w-full"></h1>

            <div className="flex flex-col p-5">
                <LoadingSkeleton title="History" />
            </div>

            <h1 className=" h-[1px] bg-white/20  w-full"></h1>

            <div className="flex flex-col p-5">
                <LoadingSkeleton title="Bookmark" />
            </div>
        </div>
    );
};

export default ProfileLoading;
