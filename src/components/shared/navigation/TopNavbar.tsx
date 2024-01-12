import React from "react";
import Link from "next/link";

import SearchModal from "../SearchModal";

import Logout from "@/components/buttons/Logout";
import { getTrendingAnime } from "@/lib/AnimeFetch";

export default async function TopNavbar() {
    const trendingPromise = await getTrendingAnime();
    return (
        <div className="sticky top-0 w-full max-w-[2500px] text-white h-20 items-center grid z-50 p-4 bg-transparent backdrop-blur-md border-b-2 border-black/20 dark:border-0">
            <div className="flex justify-between items-center flex-wrap">
                <Link href={"/"} className={`text-3xl text-white md:text-3xl font-bold`}>
                    Anime <span>Trix</span>
                </Link>
                <div className="flex justify-between items-center gap-4">
                    <SearchModal trending={trendingPromise} />
                    <Logout />
                </div>
            </div>
        </div>
    );
}
