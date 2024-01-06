"use client";

import React from "react";
import { Github, Instagram, Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/themeChange";
const socialMediaLinks = [
    {
        icon: <Github />,
        url: "https://github.com/ShivaBhattacharjee/AnimeTrix-next",
    },
    {
        icon: <Instagram />,
        url: "https://www.instagram.com/animetrix.200/",
    },
];

const Footer = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`mb-20 md:mb-0 p-4 mt-12 md:mt-0 border-t ${theme === "light" ? "border-black/20" : "border-white/20"}`}>
            <div className="flex flex-col gap-7 justify-between items-center">
                <h1 className="text-3xl font-bold">AnimeTrix</h1>
                <p className="text-[9px] md:text-sm text-center font-semibold m-auto max-w-4xl">AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only a user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access. AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant.</p>
            </div>
            <div className="flex justify-between lg:max-w-7xl lg:m-auto items-center mt-6 mb-7">
                <div className="flex gap-4 scale-90">
                    {socialMediaLinks.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.icon}
                        </a>
                    ))}
                </div>
                <div className="flex gap-2 cursor-pointer">
                    <div onClick={() => toggleTheme("dark")} className={`${theme === "dark" && "bg-white/30"} p-2 rounded-full`}>
                        <Moon size={20} />
                    </div>
                    <div onClick={() => toggleTheme("light")} className={`${theme === "light" && "bg-black/20 text-black"} p-2 rounded-full`}>
                        <Sun size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
