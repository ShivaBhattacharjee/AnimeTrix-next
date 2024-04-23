"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { BookMarked, Clapperboard, Diff, History, Home, MessageCircleHeart, ScanLine, SlidersHorizontal, TrendingUp, Tv } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const NavItems = [
    {
        name: "Home",
        route: "/",
        icons: Home,
    },
    {
        name: "Trending",
        route: "/trending",
        icons: TrendingUp,
    },
    {
        name: "Popular",
        route: "/popular",
        icons: Tv,
    },
    {
        name: "Movies",
        route: "/movie",
        icons: Clapperboard,
    },
    {
        name: "Genres",
        route: "/genres",
        icons: SlidersHorizontal,
    },
    {
        name: "AniScan",
        route: "/aniscan",
        icons: ScanLine,
    },
    {
        name: "Waifu",
        route: "/waifu",
        icons: MessageCircleHeart,
    },
    {
        name: "Bookmark",
        route: "/bookmark",
        icons: BookMarked,
    },
    {
        name: "History",
        route: "/history",
        icons: History,
    },
];
const SideBar = () => {
    console.log("Hentai onichan!! Why you looking at my source");
    useRouter();
    const [isLogged, setIsLogged] = useState(false);
    const pathname = usePathname();
    const [expand, setExpand] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const token = getCookie("token");

    useEffect(() => {
        if (token !== undefined) {
            setIsLogged(!isLogged);
        } else {
            setIsLogged(false);
        }
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef?.current && !sidebarRef?.current?.contains(event?.target as Node)) {
                setExpand(false);
            }
        };

        document?.addEventListener("click", handleClickOutside);

        return () => {
            document?.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <nav>
            {/* desktop sidebar */}
            <div className=" hidden md:flex fixed ">
                <div className={`w-52 max-lg:w-20 h-screen bg-transparent backdrop-blur-xl text-white sticky left-0 top-0 duration-300 border-r-2 border-white/25`}>
                    <div className="flex flex-col overflow-scroll h-screen mt-3 p-2 max-lg:mt-10">
                        {NavItems.map((link) => {
                            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                            const shouldRender = !(link?.name === "History" || link?.name === "Bookmark") || isLogged;
                            if (!shouldRender) {
                                return null;
                            }
                            return (
                                <Link href={link.route} onClick={() => setExpand(false)} key={link.route} className={`${isActive && `bg-[#3f3f46]`} mb-5 duration-200  transition-all hover:scale-90 p-4 rounded-lg flex gap-3 text-lg items-center cursor-pointer text-white `}>
                                    <link.icons className={`${isActive && `fill-white`}`} />
                                    <h1 className="font-semibold  max-lg:hidden block">{link.name}</h1>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* mobile bottom bar */}
            <div ref={sidebarRef} className={`text-white fixed bottom-0 md:hidden z-30 bg-black/50 rounded-t-xl border-t-2 border-white/10  backdrop-blur-md w-full p-2 duration-200 transition-all`}>
                <div className="flex items-center justify-between flex-wrap ">
                    {NavItems.slice(0, expand ? NavItems.length : 2).map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                        const shouldRender = !(link.name === "History" || link.name === "Bookmark") || isLogged;
                        if (!shouldRender) return null;
                        return (
                            <Link href={link.route} onClick={() => setExpand(false)} key={link.route} className={`flex flex-col items-center gap-3 text-sm ${isActive && ` border-white/10 border-2`} w-24 p-2 rounded-lg duration-200 transition-all`}>
                                <link.icons size={24} className={` text-white  ${isActive && `fill-white`}`} />
                                <h1 className="text-white text-sm">{link.name}</h1>
                            </Link>
                        );
                    })}
                    <div className="flex flex-col cursor-pointer relative items-center gap-3 text-sm w-24 p-2 rounded-lg duration-200 transition-all text-white " onClick={() => setExpand(!expand)}>
                        <Diff size={24} />
                        <h1 className="text-white truncate">{expand ? "Show Less" : "Show More"}</h1>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default SideBar;
