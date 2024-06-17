import SearchCards from "./cards/SearchCards";

import { getSearchResults } from "@/lib/AnimeFetch";

type ModalCloseFunction = () => void;
export const SearchResults = async ({ modalClose, searchValue }: { modalClose: ModalCloseFunction; searchValue: string }) => {
    const search = await getSearchResults(searchValue);
    return <div className=" text-white text-2xl font-semibold">{search.length > 0 ? <SearchCards isTrending={false} results={search} modalClose={modalClose} /> : <h1 className="text-white font-semibold text-2xl h-screen">No results found!!!</h1>}</div>;
};
