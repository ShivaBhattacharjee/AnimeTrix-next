import React from 'react'
import { Play } from 'lucide-react'
const AiringSchedule = () => {
    return (
        <div className='flex flex-col mt-9'>
            <h1 className='text-3xl lg:text-5xl font-bold'>Dont Miss Out</h1>
            <div className='flex gap-2'>
                {/* <Cards props={Trending} /> */}
                <div className="bg-white/10 h-52 w-full p-4 rounded-lg mt-5 lg:h-96 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        <h1>Coming Up Next!</h1>
                        <div className="flex justify-between items-center">
                            <h1 className=' truncate w-52 lg:w-full text-sm'>Alice to Therese no Maboroshi Koujou</h1>
                            <h2>Time</h2>
                        </div>

                        <div className="flex justify-between items-center">
                            <h1 className=' w-52 truncate lg:w-screen text-sm'>Name of Anime</h1>
                            {/* <div className='bg-black rounded-lg p-2'> */}
                                <Play />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiringSchedule