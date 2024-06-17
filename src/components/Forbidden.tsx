import { Ghost, KeyRound, Lock } from "lucide-react";

const Forbidden = () => {
    return (
        <div className="flex min-h-[70vh] relative flex-col gap-5 justify-center items-center ">
            <Ghost size={60} className=" absolute right-10 top-6" />
            <h1 className=" text-6xl font-bold">403</h1>
            <p className=" font-semibold text-2xl">Sorry Pal , Cant let you in</p>
            <KeyRound size={60} className=" absolute bottom-20 right-10" />
            <Lock size={60} className=" absolute bottom-20 left-20" />
        </div>
    );
};

export default Forbidden;
