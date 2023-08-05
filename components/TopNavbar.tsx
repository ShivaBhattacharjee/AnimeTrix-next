import React from 'react'

const TopNavbar = () => {
  return (
    <div className='fixed w-full max-w-[2000px] text-white h-20 items-center grid z-20 p-4 bg-white/5 backdrop-blur-lg'>
      <div className='flex justify-between items-center flex-wrap'>
        <h1 className='text-3xl font-bold relative'>Anime<span className=' ml-2 text-blue-500'>Trix</span></h1>
        <button className='bg-white text-black text-center p-3 rounded-lg text-xl font-semibold w-24 md:w-32'>Login</button>
      </div>
    </div>
  )
}

export default TopNavbar