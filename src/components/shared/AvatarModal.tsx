"use client";

import { ArrowLeft, UserRoundCog } from "lucide-react";

import { ProfiePicture } from "@/utils/ProfilePicture";
import Toast from "@/utils/toast";

interface AvatarModalProps {
    setOpenAvatarModal: React.Dispatch<React.SetStateAction<boolean>>;
    openAvatarModal: boolean;
    onSelectProfilePicture: (url: string) => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ setOpenAvatarModal, onSelectProfilePicture, openAvatarModal }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/jpg"];

            if (!validTypes.includes(file.type)) {
                Toast.ErrorShowToast("Invalid file type. Only JPG, PNG, and JPEG are allowed.");
                return;
            }
            if (file.size > 3 * 1024 * 1024) {
                Toast.ErrorShowToast("File size should be less than 3MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onSelectProfilePicture(base64String);
                setOpenAvatarModal(false);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div className={`absolute w-full z-50 p-4 left-0 right-0 bg-black bottom-0 ${openAvatarModal ? "top-0" : "top-[2000px] hidden"} duration-200 overflow-y-scroll min-h-screen hiddenscroll `}>
                <ArrowLeft className="cursor-pointer" onClick={() => setOpenAvatarModal(false)} size={40} />
                <h1 className="mt-7 text-2xl lg:text-3xl font-semibold">Custom</h1>
                <div className="w-24 mt-5 relative h-24 text-black lg:w-32 lg:h-32 rounded-full bg-white flex justify-center items-center">
                    <div className="flex relative cursor-pointer w-full justify-center items-center">
                        <input type="file" className=" opacity-0 z-50 cursor-pointer" accept=".png , .jpg , .jpeg" onChange={handleFileChange} />
                        <UserRoundCog className=" text-8xl absolute scale-150 lg " />
                    </div>
                </div>
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
