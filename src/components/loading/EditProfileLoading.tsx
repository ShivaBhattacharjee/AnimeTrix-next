import { Camera, Check } from "lucide-react";

const EditProfileLoading = () => {
    return (
        <form className="flex flex-col gap-4 p-4 overflow-y-hidden min-h-screen">
            <h1 className="text-3xl font-bold">Profile</h1>
            <span className=" w-full h-[1px] bg-white/20"></span>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                <div className="h-24 cursor-pointer w-24 relative lg:h-32 lg:w-32 rounded-full bg-white/25 duration-200 animate-pulse  text-black  flex justify-center items-center ">
                    <div className="absolute bg-white cursor-pointer p-2 rounded-full right-0 bottom-0">
                        <Camera size={20} />
                    </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-[80%]">
                    <label htmlFor="username" className=" font-semibold text-2xl">
                        Username
                    </label>
                    <div className=" w-full h-14 bg-white/25 animate-pulse duration-200 rounded-lg"></div>

                    <label htmlFor="Email" className=" font-semibold text-2xl">
                        Email
                    </label>
                    <div className=" w-full h-14 bg-white/25 animate-pulse duration-200 rounded-lg"></div>

                    <label htmlFor="Email" className=" font-semibold text-2xl">
                        Bio
                    </label>
                    <div className=" w-full h-28 bg-white/25 animate-pulse duration-200 rounded-lg"></div>
                    <button className={`flex justify-center items-center gap-4 bg-white/40  p-4 rounded-lg  font-semibold w-full mt-5 lg:w-56`}>
                        <Check />
                        Update Profile
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditProfileLoading;
