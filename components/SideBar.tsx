
"use client"
import { link } from "fs"
import {
  AlignJustify, Clapperboard, Home, TrendingUp, ScanLine,
  BookMarked, User2, History, SlidersHorizontal, Tv
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
const NavItems = [
  {
    "name": "Home",
    "route": "/",
    "icons": Home
  },
  {
    "name": "Trending",
    "route": "/trending",
    "icons": TrendingUp
  },
  {
    "name": "Popular",
    "route": "/popular",
    "icons": Tv
  },
  {
    "name": "Movies",
    "route": "/movie",
    "icons": Clapperboard
  },
  {
    "name": "Genres",
    "route": "/genres",
    "icons": SlidersHorizontal
  }, {
    "name": "AniScan",
    "route": "/aniscan",
    "icons": ScanLine
  }
  , {
    "name": "Bookmark",
    "route": "/bookmark",
    "icons": BookMarked
  }, {
    "name": "History",
    "route": "/history",
    "icons": History
  }, {
    "name": "Profile",
    "route": "/profile",
    "icons": User2
  }
]
const SideBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className=" hidden md:flex fixed ">
      <div className={` w-72 max-lg:w-20 h-screen bg-black text-white sticky left-0 top-0 duration-300`}>
        <div className={`flex gap-5 p-6 text-2xl items-center`}>
        </div>
        <div className="flex flex-col gap-5 pr-4 mt-12">
          {NavItems.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link href={link.route} key={link.name} className={`${isActive&& `bg-[#3f3f46]`} p-4 rounded-lg flex gap-3 text-xl items-center cursor-pointer`}>
                <link.icons />
                <li className="font-semibold hover:translate-x-3 duration-200 transition-all max-lg:hidden block">{link.name}</li>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SideBar