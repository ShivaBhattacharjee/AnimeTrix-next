"use client"

import { useState } from "react"
import { AlignJustify, Clapperboard } from "lucide-react"
import Link from "next/link"
const NavItems = [
  {
    "name": "Home",
    "routes": "/"
  },
  {
    "name": "Trending",
    "routes": "/trending"
  },
  {
    "name": "Popular",
    "routes": "/popular"
  },
  {
    "name": "Movies",
    "routes": "/movie"
  },
  {
    "name": "Genres",
    "routes": "/genres"
  }, {
    "name": "AniScan",
    "routes": "/aniscan"
  }
  , {
    "name": "Bookmark",
    "routes": "/bookmark"
  }, {
    "name": "History",
    "routes": "/aniscan"
  }, {
    "name": "Profile",
    "routes": "/aniscan"
  }
]
const SideBar = () => {
  const [expandSideNav, setExpandSideNav] = useState(false)
  return (
    <div className="hidden md:flex">
      <div className={`${expandSideNav ? "w-72" : "w-20"} h-screen bg-purple-600 relative duration-200`}>
        <div className="flex gap-7 p-4 overflow-hidden items-center">
          <AlignJustify onClick={() => setExpandSideNav(!expandSideNav)} className=" cursor-pointer scale-150" />
          {
            expandSideNav && (
              <h1 className="text-2xl">Animetrix</h1>
            )
          }
        </div>
        <ul className="flex p-4  flex-col gap-4 text-2xl mt-5">
          {NavItems.map((items) => (
            <Link href={items.routes}>
              <li className="flex gap-4 overflow-hidden pb-7"><Clapperboard /></li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar