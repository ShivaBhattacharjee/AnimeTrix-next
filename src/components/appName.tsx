"use client";
import React from "react";
import Link from "next/link";

import { useTheme } from "@/context/themeChange";

const AppName = () => {
    const { theme } = useTheme();
    return (
        <Link href={"/"} className={`text-3xl ${theme === "light" ? "text-black" : "text-white"} md:text-3xl font-bold`}>
            Anime <span>Trix</span>
        </Link>
    );
};

export default AppName;
