import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const VerticalCards = ({ title, data }) => {
    return (
        <div className='p-4 pb-40 lg:pb-16'>
            <h1 className='text-3xl lg:text-5xl  font-bold'>{title}</h1>
            <div
                className='grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center lg:p-5 mt-8 overflow-hidden'
            >
                {
                    data.map((anime) => {
                        return (
                            <div>
                                <Link href={`/details/${anime.id}`} className='content-normal overflow-hidden w-full h-full'>
                                    <div className='md:w-48 md:h-64 h-64 w-50 relative overflow-hidden'>
                                        <Image
                                            src={anime?.image}
                                            alt={`an image of ${anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji || anime.title?.native}`}
                                            layout='fill'
                                            className='rounded-lg hover:scale-105 duration-200'
                                            objectFit='cover'
                                            draggable={false}
                                        />
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default VerticalCards