import ServerError from '@/components/error/ServerError';
import VerticalCards from '@/components/shared/cards/VerticalCards';
import AnimeApi from '@/lib/animetrixapi';
import React from 'react'
const getPopularAnime = async () => {
  try {
    const response = await fetch(`${AnimeApi}/popular?perPage=24`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return [];
  }
};
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