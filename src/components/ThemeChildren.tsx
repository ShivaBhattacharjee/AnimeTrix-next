"use client";
import React from "react";

import { useTheme } from "@/context/themeChange";

export const ThemeChildren = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();

    return <div className={`min-h-screen ${theme === "light" ? "bg-white text-black" : theme === "dark" ? "bg-black text-white" : theme === "system" ? "dark:bg-black dark:text-white bg-white text-black" : ""} w-full max-w-[2500px] m-auto`}>{children}</div>;
};
