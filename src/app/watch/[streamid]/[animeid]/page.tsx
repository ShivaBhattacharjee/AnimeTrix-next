import React from 'react'

const Page = ({ params }: {
    params:
    {
        streamid: string,
        animeid: number
    }
}) => {
    return (
        <div className='flex justify-center flex-col gap-4 items-center h-screen text-3xl font-bold'>
            <p>Stream ID: {params.streamid}</p>
            <p>Anime ID: {params.animeid}</p>
        </div>
    )
}

export default Page
