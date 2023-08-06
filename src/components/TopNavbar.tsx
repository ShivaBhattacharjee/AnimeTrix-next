import  Link  from 'next/link'
import React from 'react'

const TopNavbar = () => {
  return (
    <div className='fixed w-full max-w-[2500px] text-white h-20 items-center grid z-20 p-4 bg-white/5 backdrop-blur-lg'>
      <div className='flex justify-between items-center flex-wrap'>
        <h1 className='text-3xl font-bold relative'>Anime <span>Trix</span></h1>
        <Link href={"/login"} className='bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 rounded-lg text-xl font-semibold w-24 md:w-32'>Login</Link>
      </div>
    </div>
  )
}

export default TopNavbar