import React from "react";

import SpinLoading from "@/components/loading/SpinLoading";

const loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SpinLoading />
        </div>
    );
};

export default loading;
