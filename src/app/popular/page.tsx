import ServerError from '@/components/error/ServerError';
import VerticalCards from '@/components/shared/cards/VerticalCards';
import React from 'react'
import { getPopularAnime } from '@/lib/AnimeFetch';
export default async function page() {
  const Popular = await getPopularAnime()
  return (
    <>
      {Popular.length > 0 ? (
        <VerticalCards title={"Popular"} data={Popular} />
      ) : (
        <ServerError />
      )}
    </>
  )
}