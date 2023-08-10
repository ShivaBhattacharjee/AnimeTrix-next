import React from 'react'
interface LoadingSkeletonProps {
  title: string;
}

const LoadingSkeleton = ({ title }: LoadingSkeletonProps)  => {
  return (
    <div className='p-4 pb-40 lg:pb-16'>
      <h1 className='text-3xl lg:text-5xl mt-6 font-bold'>{title}</h1>
      <div
        className='grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-center lg:p-5 mt-8 overflow-hidden'
      >
        {
          [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(() => {
            return (
              <div className='bg-white/40 mt-5 animate-pulse duration-200 rounded-lg w-42  lg:w-56 lg:h-80 h-64'>

              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default LoadingSkeleton