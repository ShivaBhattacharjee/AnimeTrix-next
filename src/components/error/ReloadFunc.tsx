"use client";

import { FC } from "react";

const ReloadFunc: FC<{ message: string }> = ({ message }) => {
    return (
        <div className="cursor-pointer flex gap-2 mt-5">
            {message}
            <span className="text-red-500" onClick={() => window.location.reload()}>
                Reload
            </span>
        </div>
    );
};

export default ReloadFunc;
