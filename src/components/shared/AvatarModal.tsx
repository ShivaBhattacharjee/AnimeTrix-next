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
            <div className={`absolute p-4 w-full bg-black left-0 right-0 ${openAvatarModal ? "top-0" : "top-[2000px] hidden"} overflow-y-hidden duration-200 h-screen`}>
                <ArrowLeft className="cursor-pointer" onClick={() => setOpenAvatarModal(false)} size={40} />
                {ProfiePicture.map((profile) => (
                    <div key={profile.Bleach[0].alt}>
                        <h1 className="mt-3 text-3xl font-semibold">{Object.keys(profile)[0]}</h1>
                        <div className="flex gap-3 mt-7 overflow-x-scroll lg:flex-col hiddenscroll">
                            {profile.Bleach.map((avatar) => (
                                <img
                                    key={avatar.alt}
                                    src={avatar.url}
                                    alt={avatar.alt}
                                    className="w-32 h-32 rounded-full object-cover cursor-pointer"
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
