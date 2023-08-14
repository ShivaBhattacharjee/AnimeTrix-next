import React from 'react'
import { ServerCrash } from "lucide-react"
const WrongUrl = () => {
    return (
        <div className="h-[90vh] overflow-hidden p-4 gap-9 flex items-center flex-col justify-center">
            <ServerCrash className=' w-32 h-32' />
            <h1 className='text-4xl font-bold'>400 - Wrong URL</h1>
            <p className='text-center text-xl font-semibold'>
                Sorry, is the URL correct? We can't seem to find it.
            </p>
        </div>
    )
}

export default WrongUrl