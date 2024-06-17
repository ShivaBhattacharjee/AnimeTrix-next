"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios, { AxiosResponse } from "axios";
import { Search, Trash2 } from "lucide-react";

import AniScanSearchLayout from "@/components/AniScanSearchLayout";
import SpinLoading from "@/components/loading/SpinLoading";
import { ApiResponse } from "@/types/animetypes";

const fileTypes = ["JPG", "PNG", "JPEG"];
function AnimeImageSearch() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(true);
    const [searchResult, setSearchResult] = useState<ApiResponse | null>(null); // Use ApiResponse instead of SearchResult

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleChange = (e: File) => {
        const objectUrl = URL.createObjectURL(e);
        setPreview(objectUrl);
        setFile(e);
    };

    const handleSubmit = async (fileOrText: File | string) => {
        try {
            setLoading(true);
            if (fileOrText instanceof File) {
                const formData = new FormData();
                formData.append("file", fileOrText);
                const response: AxiosResponse<ApiResponse> = await axios({
                    // Use ApiResponse instead of SearchResult
                    method: "post",
                    url: "https://api.trace.moe/search?anilistInfo&cutBorders",
                    data: formData,
                    headers: { "Content-Type": "image/jpeg" },
                });
                URL.revokeObjectURL(preview as string);
                setPreview(null);
                setFile(null);
                setSearchResult(response.data);
            } else {
                const response: AxiosResponse<ApiResponse> = await axios({
                    // Use ApiResponse instead of SearchResult
                    method: "post",
                    url: `https://api.trace.moe/search?anilistInfo&cutBorders&url=${encodeURIComponent(`${fileOrText}`)}`,
                });
                setText("");
                setSearchResult(response.data);
            }
            setLoading(false);
            setToggle(false);
        } catch (error) {
            setText("");
            setFile(null);
            setPreview(null);
            setLoading(false);
            setToggle(true);
            console.log(error);
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <>
            {/* Removed the comment inside the JSX */}
            {searchResult != null && <AniScanSearchLayout searchResult={searchResult} />}
            <div className={`${searchResult != null ? "" : "flex min-h-[80vh] justify-center items-center flex-col" + (preview ? " mb-24" : "")}`}>
                {toggle ? (
                    <>
                        <div className="flex flex-col gap-3 justify-center items-center p-3">
                            <h1 className=" text-3xl md:text-5xl font-semibold">Search Anime by Scene</h1>
                            <p className=" text-sm font-base max-w-4xl text-center p-3">Disclaimer: This feature may not be 100% accurate and only works with in-scene anime episodes, not anime wallpapers</p>
                        </div>
                        {preview ? (
                            <div className="flex justify-center items-center">
                                {!loading ? (
                                    <div className="flex justify-center items-center flex-col gap-5">
                                        <div className="flex justify-center flex-col items-center ">
                                            <img className=" w-80 md:w-1/2 rounded-lg relative" src={preview || ""} alt="preview image" />
                                            <button onClick={handleRemoveImage} className=" bg-white  flex items-center gap-3 text-black  p-2 text-lg mt-5 rounded-lg font-semibold">
                                                <Trash2 />
                                                Delete
                                            </button>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-8">
                                            <label className=" text-center font-semibold text-lg">Wrong image? </label>
                                            <div className="lg:scale-125">
                                                <FileUploader handleChange={(e: File) => handleChange(e)} name="file" types={fileTypes} multiple={false} maxSize={25} />
                                            </div>
                                        </div>
                                        <button className="bg-white  mt-5 flex justify-center items-center gap-3 p-3 text-black rounded-lg font-semibold text-xl w-40" onClick={() => file && handleSubmit(file)}>
                                            <Search />
                                            Search
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <SpinLoading />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 w-full">
                                {!loading ? (
                                    <div className="flex justify-center items-center flex-col">
                                        <div className=" lg:scale-125">
                                            <FileUploader handleChange={(e: File) => handleChange(e)} name="file" types={fileTypes} multiple={false} />
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-3">
                                            <span className=" font-semibold mt-5 text-xl">OR</span>
                                            <input type="text" required className="bg-transparent w-[80vw] md:w-[50vw] 2xl:w-[500px] p-4 rounded-lg  border-2 border-white/30 duration-200 sticky top-0 outline-none focus:outline-none text-white" placeholder="Enter Image Url" value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
                                            <button className="flex items-center gap-3 justify-center bg-white  p-3  text-black rounded-lg font-semibold text-xl w-40 mt-5" onClick={() => handleSubmit(text)} aria-label="URL search button">
                                                <Search />
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <SpinLoading />
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </>
    );
}

export default AnimeImageSearch;
