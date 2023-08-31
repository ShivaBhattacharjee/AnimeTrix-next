import React from "react";
import SearchCards from "./cards/SearchCards";
import { AnimeApi } from "@/lib/animeapi/animetrixapi";
type ModalCloseFunction = () => void;
export const getSearchResults = async (searchValue: string) => {
    try {
        const response = await fetch(`${AnimeApi}/${searchValue}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching anime search results", error);
        return [];
    }
};
export const SearchResults = async ({ modalClose, searchValue }: { modalClose: ModalCloseFunction; searchValue: any }) => {
    const search = await getSearchResults(searchValue);
    return <div className=" text-white text-2xl font-semibold">{search.length > 0 ? <SearchCards results={search} modalClose={modalClose} /> : <h1 className="text-white">No results found!!!</h1>}</div>;
};
