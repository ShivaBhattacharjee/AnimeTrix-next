import React from "react";

const page = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-3xl font-bold">Profile</h1>
            <span className=" w-full h-[1px] bg-white/20"></span>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-white  text-black  flex justify-center items-center ">
                    <h1 className="font-bold text-4xl">S</h1>
                </div>
                <div className="flex flex-col gap-3 lg:w-[80%]">
                    <label htmlFor="username" className=" font-semibold text-2xl">
                        Username
                    </label>
                    <input type="text" placeholder="Username" className=" p-3 bg-transparent border-[1px] rounded-lg border-white/20 focus:outline-none" />

                    <label htmlFor="Email" className=" font-semibold text-2xl">
                        Email
                    </label>
                    <input type="email" placeholder="Username" className=" p-3 bg-transparent border-[1px] rounded-lg border-white/20 focus:outline-none text-white/60" value={"underdev@test.com"} disabled={true} />

                    <label htmlFor="Email" className=" font-semibold text-2xl">
                        Bio
                    </label>
                    <textarea name="" id="" placeholder="Bio" className=" bg-transparent border p-3 rounded-lg focus:outline-none border-white/20"></textarea>
                </div>
            </div>
        </div>
    );
};

export default page;
