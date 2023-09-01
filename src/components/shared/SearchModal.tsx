"use client";
import React, { useEffect, useRef, useCallback, useState, Suspense } from "react";
import { Search, XCircle } from "lucide-react";
import Anime from "@/types/animetypes";
import SearchCards from "./cards/SearchCards";
import SpinLoading from "../loading/SpinLoading";
import { SearchResults } from "./SearchResults";
const SearchModal = ({ trending }: { trending: Anime[] }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const closeSearchModal = () => {
        setOpenSearch(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "/") {
                setOpenSearch((prevState) => !prevState);
            }
        };

        if (typeof globalThis !== "undefined") {
            globalThis.addEventListener("keydown", handleKeyDown);
            return () => {
                globalThis.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, []);
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeSearchModal();
            }
        },
        [closeSearchModal],
    );

    useEffect(() => {
        if (openSearch) {
            document.body.style.overflow = "hidden";
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSearch, handleClickOutside]);
    const handleModalClose = () => {
        setOpenSearch(!openSearch);
    };

    const debounce = <T extends string[]>(func: (...args: T) => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: T) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedSetSearchValue = useCallback(
        debounce((value: string) => {
            setSearchValue(value);
        }, 800),
        [],
    );

    return (
        <>
            <Search className="cursor-pointer" onClick={() => setOpenSearch(!openSearch)} />
            <div className={`bg-black/80 overscroll-none w-screen backdrop-blur-xl h-screen fixed p-4 left-0 top-0 bottom-0 duration-200 right-0 ${openSearch ? "scale-100" : "scale-0"}`}>
                <div className="flex h-screen items-center right-5 top-5">
                    <div className="bg-black border-2 border-white/40 h-96 overflow-y-scroll  gap-4 flex-col rounded-lg p-4 max-w-3xl m-auto w-screen text-black flex" ref={modalRef}>
                        <h1 className="font-bold text-white text-lg flex gap-3 items-center ">
                            Open/Close : <span className=" bg-white text-black p-2 rounded-lg text-sm">Ctrl</span>+ <span className=" bg-white text-black text-sm p-2 rounded-lg">/</span>
                        </h1>
                        <div className="flex p-4 items-center border-2 z-50 border-white/40 sticky top-0 bg-black w-full rounded-lg">
                            <input type="text" placeholder="I am looking for ......" className=" bg-transparent border-none duration-200 sticky top-0 outline-none w-[95%] focus:outline-none text-white" onChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchValue(e.target.value)} />
                            {/* {searchValue != "" && <XCircle size={20} className=" text-white cursor-pointer" onClick={() => setSearchValue("")} />} */}
                        </div>
                        <Suspense
                            fallback={
                                <div className="flex justify-center h-screen items-center">
                                    <SpinLoading />
                                </div>
                            }
                        >
                            {searchValue !== "" ? (
                                <div>
                                    <h1 className="text-white bg-black font-semibold text-lg mb-4">Search Results for {searchValue}</h1>
                                    <SearchResults modalClose={handleModalClose} searchValue={searchValue} />
                                </div>
                            ) : (
                                <>
                                    {" "}
                                    <h1 className=" text-2xl font-semibold text-white">Trending</h1>
                                    <SearchCards isTrending={true} results={trending} modalClose={handleModalClose} />
                                </>
                            )}
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchModal;
