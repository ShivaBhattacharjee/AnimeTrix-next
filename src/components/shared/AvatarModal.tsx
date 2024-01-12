"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";

import { ProfiePicture } from "@/utils/ProfilePicture";

interface AvatarModalProps {
    setOpenAvatarModal: React.Dispatch<React.SetStateAction<boolean>>;
    openAvatarModal: boolean;
    onSelectProfilePicture: (url: string) => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ setOpenAvatarModal, onSelectProfilePicture, openAvatarModal }) => {
    return (
        <>
            <div className={`absolute w-full z-50 p-4 left-0 right-0 bg-black bottom-0 ${openAvatarModal ? "top-0" : "top-[2000px] hidden"} duration-200 overflow-y-scroll min-h-screen hiddenscroll `}>
                <ArrowLeft className="cursor-pointer" onClick={() => setOpenAvatarModal(false)} size={40} />
                {Object.keys(ProfiePicture.Profiles).map((anime) => (
                    <div key={anime}>
                        <h1 className="mt-7 text-2xl lg:text-3xl font-semibold">{anime}</h1>
                        <div className="flex gap-3 mt-2 overflow-x-scroll lg:flex-wrap lg:overflow-x-hidden hiddenscroll">
                            {ProfiePicture.Profiles[anime as keyof typeof ProfiePicture.Profiles].map((avatar) => (
                                <img
                                    key={avatar.alt}
                                    src={avatar.url}
                                    alt={avatar.alt}
                                    className=" w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover cursor-pointer"
                                    onClick={() => {
                                        onSelectProfilePicture(avatar.url);
                                        setOpenAvatarModal(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AvatarModal;
