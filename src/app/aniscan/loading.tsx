import SpinLoading from "@/components/loading/SpinLoading";
import React from "react";

const loading = () => {
    return (
        <div className=" flex h-screen justify-center items-center">
            <SpinLoading />
        </div>
    );
};

export default loading;
