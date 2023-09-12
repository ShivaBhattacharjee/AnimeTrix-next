import SpinLoading from "@/components/loading/SpinLoading";
import React from "react";

const loading = () => {
    return (
        <div className=" flex min-h-[80vh] h-auto justify-center items-center">
            <SpinLoading />
        </div>
    );
};

export default loading;
