"use client"

import { useState } from "react"
import { AlignJustify, Clapperboard,Home,TrendingUp,ScanLine ,
  BookMarked ,User2,History,SlidersHorizontal,Tv  } from "lucide-react"
import Link from "next/link"
const NavItems = [
  {
    "name": "Home",
    "routes": "/",
    "icons" : Home
  },
  {
    "name": "Trending",
    "routes": "/trending",
    "icons" : TrendingUp
  },
  {
    "name": "Popular",
    "routes": "/popular",
    "icons" : Tv
  },
  {
    "name": "Movies",
    "routes": "/movie",
    "icons" : Clapperboard
  },
  {
    "name": "Genres",
    "routes": "/genres",
    "icons" : SlidersHorizontal
  }, {
    "name": "AniScan",
    "routes": "/aniscan",
    "icons" : ScanLine
  }
  , {
    "name": "Bookmark",
    "routes": "/bookmark",
    "icons" : BookMarked
  }, {
    "name": "History",
    "routes": "/history",
    "icons" : History
  }, {
    "name": "Profile",
    "routes": "/profile",
    "icons" : User2
  }
]
const SideBar = () => {
  const [expandSideNav, setExpandSideNav] = useState(false)
  return (
    <div className=" hidden md:flex fixed z-10">
      <div className={`${expandSideNav?"w-72": "w-20"} h-screen bg-black text-white relative duration-300`}>
        <div className={`flex gap-5 p-6 text-2xl items-center ${!expandSideNav&&(
          "justify-center"
        )}`}>
        <AlignJustify className=" scale-150  cursor-pointer" onClick={()=>setExpandSideNav(!expandSideNav)}/>
        <h1 className={`${expandSideNav?" visible":"hidden"} font-bold`}>AnimeTrix</h1>
        </div>
        <div className="flex flex-col gap-5 p-3 mt-4">
          {NavItems.map((items)=>(
            <div key={items.name} className="bg-[#3f3f46]  p-4 rounded-lg flex gap-3 text-xl items-center cursor-pointer">
              <items.icons />
              {expandSideNav&&(
              <li className="font-semibold hover:translate-x-3 duration-200 transition-all">{items.name}</li>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar