"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios, { AxiosResponse } from "axios";
import { Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AniScanSearchLayout from "@/components/AniScanSearchLayout";
import SpinLoading from "@/components/loading/SpinLoading";
import { ApiResponse } from "@/types/animetypes";

const fileTypes = ["JPG", "PNG", "JPEG"];

export default function AnimeImageSearch() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<ApiResponse | null>(null);

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
            let response: AxiosResponse<ApiResponse>;

            if (fileOrText instanceof File) {
                const formData = new FormData();
                formData.append("file", fileOrText);
                response = await axios({
                    method: "post",
                    url: "https://api.trace.moe/search?anilistInfo&cutBorders",
                    data: formData,
                    headers: { "Content-Type": "image/jpeg" },
                });
                URL.revokeObjectURL(preview as string);
                setPreview(null);
                setFile(null);
            } else {
                response = await axios({
                    method: "post",
                    url: `https://api.trace.moe/search?anilistInfo&cutBorders&url=${encodeURIComponent(`${fileOrText}`)}`,
                });
                setText("");
            }

            setSearchResult(response.data);
            setLoading(false);
        } catch (error) {
            setText("");
            setFile(null);
            setPreview(null);
            setLoading(false);
            console.error(error);
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Search Anime by Scene</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center mb-6">Disclaimer: This feature may not be 100% accurate and only works with in-scene anime episodes, not anime wallpapers.</p>
                    <Tabs defaultValue="file" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="file">Upload Image</TabsTrigger>
                            <TabsTrigger value="url">Image URL</TabsTrigger>
                        </TabsList>
                        <TabsContent value="file" className="mt-4">
                            {preview ? (
                                <div className="space-y-4">
                                    <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                                    <div className="flex justify-between">
                                        <Button variant="destructive" onClick={handleRemoveImage} className="w-full mr-2">
                                            <Trash2 className="mr-2 h-4 w-4" /> Remove Image
                                        </Button>
                                        <Button onClick={() => file && handleSubmit(file)} className="w-full ml-2" disabled={loading}>
                                            {loading ? (
                                                <SpinLoading />
                                            ) : (
                                                <>
                                                    <Search className="mr-2 h-4 w-4" /> Search
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <FileUploader handleChange={(e: File) => handleChange(e)} name="file" types={fileTypes} multiple={false} maxSize={25}>
                                        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or JPEG (MAX. 25MB)</p>
                                            </div>
                                        </div>
                                    </FileUploader>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="url" className="mt-4">
                            <div className="space-y-4">
                                <Input type="text" placeholder="Enter Image URL" value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
                                <Button onClick={() => handleSubmit(text)} className="w-full" disabled={loading || !text}>
                                    {loading ? (
                                        <SpinLoading />
                                    ) : (
                                        <>
                                            <Search className="mr-2 h-4 w-4" /> Search
                                        </>
                                    )}
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            {searchResult && (
                <div className="mt-8">
                    <AniScanSearchLayout searchResult={searchResult} />
                </div>
            )}
        </div>
    );
}
