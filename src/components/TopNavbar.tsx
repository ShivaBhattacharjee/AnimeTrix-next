import  Link  from 'next/link'
import React from 'react'
import {Search} from "lucide-react"
const TopNavbar = () => {
  return (
    <div className='fixed w-full max-w-[2500px] text-white h-20 items-center grid z-20 p-4
     bg-white/5 backdrop-blur-lg'>
      <div className='flex justify-between items-center flex-wrap'>
        <h1 className='text-xl md:text-3xl font-bold relative'>Anime <span>Trix</span></h1>
        <div className='flex justify-between items-center gap-3'>
        <Search className=' cursor-pointer lg:hidden' />
        <Link href={"/login"} className='bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 
        text-sm md:text-xl rounded-lg  font-semibold w-16 md:w-32'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default TopNavbar