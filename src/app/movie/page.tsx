import ServerError from '@/components/error/ServerError';
import VerticalCards from '@/components/shared/cards/VerticalCards';
import React from 'react'
import { getAnimeMovies } from '@/lib/GetAnime';
export default async function page() {
  const Movies = await getAnimeMovies()
  return (
    <>
      {Movies.length > 0 ? (
        <VerticalCards title={"Movies"} data={Movies} />
      ) : (
        <ServerError />
      )}
    </>
  )
}