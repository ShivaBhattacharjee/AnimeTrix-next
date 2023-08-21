import React from 'react'
import {Frown} from "lucide-react"
const EpisodeLists = ({listData} : any) => {
  return (
    <h1>{listData.length > 0 ?(
        <div className=' text-3xl text-center font-semibold'>Episodes are available</div>
    ):(
        <div className='flex capitalize items-center justify-center text-3xl font-semibold mt-9 gap-3'>
            <Frown/>
            <h1>Opps No Episode found!!</h1>
        </div>
    )}</h1>
  )
}

export default EpisodeLists