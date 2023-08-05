import React from 'react'

const TopNavbar = () => {
  return (
    <div className='fixed w-full text-white h-20 items-center grid z-20 p-4 bg-black/90 backdrop-blur-lg'>
      <div className='flex justify-between'>
        <h1>AnimeTrix</h1>
        <h1>Profile</h1>
      </div>
    </div>
  )
}

export default TopNavbar