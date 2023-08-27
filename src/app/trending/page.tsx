import ServerError from '@/components/error/ServerError';
import VerticalCards from '@/components/shared/cards/VerticalCards';
import React from 'react'
import { getTrendingAnime } from '@/lib/GetAnime';
export default async function page() {
  const trending = await getTrendingAnime()
  return (
    <>
      {trending.length > 0 ? (
        <VerticalCards title={"Trending"} data={trending} />
      ) : (
        <ServerError />
      )}
    </>
  )
}