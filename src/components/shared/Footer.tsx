"use client";
import React from "react";
import { Github, Instagram, Monitor } from "lucide-react";

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
type Theme = "dark" | "light" | "system";
const themeOptions: { icon: React.ReactNode; name: Theme }[] = [
    {
        icon: <Monitor />,
        name: "system",
    },
];

const Footer = () => {
    return (
        <div className={`mb-20 md:mb-0 p-4 mt-12 md:mt-0 border-t border-black/20 dark:border-white/20`}>
            <div className="flex flex-col gap-7 justify-between items-center">
                <h1 className="text-3xl font-bold">AnimeTrix</h1>
                <p className="text-[9px] md:text-sm text-center font-semibold m-auto max-w-4xl">AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only a user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access. AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant.</p>
            </div>
            <div className="w-full md:w-1/2 m-auto">
                <div className="flex justify-between mt-12 items-center">
                    <div className="flex gap-2 pb-6">
                        {socialMediaLinks.map((link, index) => (
                            <a key={index} href={link.url} rel="noopener noreferrer" target="_blank">
                                {link.icon}
                            </a>
                        ))}
                    </div>
                    <div className="flex gap-4 items-center">
                        {themeOptions.map((opt) => (
                            <button key={opt.name} className={`p-2 rounded-full dark:bg-white/10 bg-black/10`}>
                                {opt.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
