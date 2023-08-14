import ServerError from '@/components/error/ServerError';
import VerticalCards from '@/components/shared/VerticalCards';
import React from 'react'
const getTrendingAnime = async () => {
  try {
    const response = await fetch("https://animetrix-api.vercel.app/meta/anilist/trending?perPage=24");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return [];
  }
};
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