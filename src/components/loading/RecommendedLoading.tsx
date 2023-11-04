import CardSkeleton from "./CardSkeleton";
import React from "react";

const RecommendedLoading = () => {
    return (
        <>
            <h1 className=" text-4xl font-semibold">Recommended</h1>
            <CardSkeleton />
        </>
    );
};

export default RecommendedLoading;
