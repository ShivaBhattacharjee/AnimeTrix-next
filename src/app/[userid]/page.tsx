"use client";

import { BadgeCheck, Quote, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

import Toast from "@/utils/toast";

const getUser = async (id: string) => {
    try {
        const res = await fetch(`/api/get-users?userId=${id}`);
        const data = await res.json();
        if (data.status === 404) {
            notFound();
        }
        console.log(data);
        return data.userData;
    } catch (error) {
        console.log(error);
        Toast.ErrorShowToast("An error occurred");
        notFound();
    }
};
const page = async ({
    params,
}: {
    params: {
        userid: string;
    };
}) => {
    const user = await getUser(params.userid);

    const handleShareClick = async () => {
        const shareData = {
            title: `Hello i am ${user?.username || "Unknown"} and i am using AnimeTrix`,
            text: `Download and Stream Anime for Free on AnimeTrix!`,
            url: globalThis.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (globalThis.window && globalThis.window.androidShare) {
                globalThis.window.androidShare(shareData.title, shareData.text, shareData.url);
            } else {
                Toast.ErrorShowToast("Your browser does not support sharing.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="min-h-[60vh] w-full justify-center flex flex-col gap-3  md:w-[50%] md:m-auto">
            <div className=" absolute top-4 right-6 cursor-pointer">
                <Share2 onClick={handleShareClick} />
            </div>
            <div className=" w-full p-4 border-white/40 rounded-lg gap-4 flex items-center flex-col justify-center">
                <div className=" h-24 w-24 lg:h-32 relative lg:w-32 rounded-full bg-white text-black flex justify-center items-center ">{!user?.profilePicture ? <h1 className=" font-bold text-4xl">{user.username?.charAt(0).toUpperCase() || "?"}</h1> : <img src={user?.profilePicture || ""} alt={user?.username || "unknown"} className=" w-24 h-24 lg:w-32 lg:h-32 rounded-full" />}</div>
                <div className="flex flex-wrap items-center gap-2">
                    <h1 className=" font-bold tracking-wide text-xl">Name : {user?.username || "Unknown"}</h1>
                    {user?.isVerified && <BadgeCheck size={20} className="text-blue-600" />}
                </div>
                <div className="border-2 border-white/40 text-lg max-h-24 overflow-y-scroll   p-2 rounded-lg md:w-1/2 w-[80%]  m-auto font-semibold ">
                    <label htmlFor="desc" className="text-sm mb-7">
                        Description
                    </label>
                    <div className="flex items-center gap-2 relative">
                        <Quote className=" rotate-180  absolute top-0 " size={20} />
                        <span className="w-full flex justify-center items-center mb-1 ml-3 md:ml-0 text-center">{user?.userDescription || "Unknown"}</span>
                        <Quote className=" absolute bottom-0 right-0" size={20} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;
