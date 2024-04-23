"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { SendHorizonal } from "lucide-react";

import Toast from "@/utils/toast";

const Page = ({ params }: { params: { waifuid: string; animename: string } }) => {
    const [message, setMessage] = useState<{ text?: string; isBot: boolean }[]>(() => [{ text: "", isBot: true }]);
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
    const msgEnd = React.useRef<HTMLDivElement>(null);

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];
    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings,
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const text = prompt;
            setPrompt("");
            if (prompt.length > 1) {
                setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]);
                setLoading(true);
                const result = await model.generateContentStream(`
                Before responding make sure to follow to these 
                1. you are bot that is designed to act like anime characters 
                2. You can suggest anime and review anime content
                3. You are ${params.waifuid} from ${params.animename} and you should act like ${params.waifuid}
                4. If anyone asks you who is your creator and who created you or any question like this respond with you are a chat bot under animetrix that acts like anime character
                ${prompt}`);
                const res = await result.response;
                const botResponse = res.text() || "";
                setMessage((prevMessages) => [
                    ...prevMessages,
                    {
                        text: botResponse,
                        isBot: true,
                    },
                ]);
            } else {
                Toast.ErrorShowToast("Message cannot be empty");
            }
        } catch (error) {
            setLoading(false);
            setMessage((prevMessages) => [
                ...prevMessages,
                {
                    text: "Request failed",
                    isBot: true,
                },
            ]);
            Toast.ErrorShowToast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        msgEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const fakeSubmitEvent = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
            handleSubmit(fakeSubmitEvent);
        }
    };

    return (
        <section className="min-h-[92vh] lg:p-8 p-2 hiddenscroll mb-32 w-full relative text-white overflow-y-scroll flex flex-col justify-between align-middle">
            <h1 className="text-xl  bg-black w-full font-bold text-center">{params.waifuid.replace("%20", " ")}</h1>
            {/* chatbody */}
            <div className=" overflow-y-scroll mb-14 overflow-x-hidden h-[90%] w-full max-w-full">
                <div className="flex flex-col mb-9 mt-9 relative">
                    {message.map((msg, index) => (
                        <React.Fragment key={index}>
                            {msg.text !== "" && (
                                <div className={`break-words max-w-[90%] lg:max-w-[30%] ${msg.isBot ? "self-start" : "self-end"} px-3 py-3`}>
                                    <div className={`${msg.isBot ? "bg-white/20 text-white rounded-lg  " : " bg-white/10 text-white w-auto font-bold rounded-lg break-words"} p-4 rounded-lg whitespace-pre-wrap `}>
                                        <span>{msg.isBot ? <span>{msg.text}</span> : <span>{msg.text}</span>}</span>
                                    </div>
                                    {/* message end */}
                                    <div ref={msgEnd}></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                    {loading && (
                        <div className="flex flex-col gap-2 p-2">
                            <div className={`break-words w-[90%] h-10 md:w-[50%] lg:w-[40%] bg-white/40 animate-pulse text-sm flex gap-7 self-start p-3 rounded-lg`}></div>
                            <div className={`break-words w-[90%] h-10 md:w-[50%] lg:w-[40%] bg-white/40 animate-pulse text-sm flex gap-7 self-start p-3 rounded-lg`}></div>
                            <div className={`break-words w-[90%] h-10 md:w-[50%] lg:w-[40%] bg-white/40 animate-pulse text-sm flex gap-7 self-start p-3 rounded-lg`}></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex w-full flex-col hiddenscroll m-auto gap-3 justify-center items-center">
                <form onSubmit={handleSubmit} className=" border-2 fixed z-50 lg:w-[60%] w-[95%] md:w-[80%] md:bottom-10  bottom-[7.5rem]  m-auto left-0 right-0 md:left-20 lg:left-48 border-white/10 flex gap-7 flex-wrap justify-between bg-black/80  max-h-20 rounded-lg p-6 overflow-auto hiddenscroll ">
                    <div className="w-full">
                        {loading ? (
                            <div className="flex font-semibold tracking-wide gap-4 w-full text-center justify-center items-center">
                                Typing <SyncLoader color="#fff" size={3} />
                            </div>
                        ) : (
                            <>
                                <textarea onKeyDown={handleTextareaKeyDown} placeholder="Enter a message" rows={1} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)} className="border-0 font-medium bg-transparent  outline-none overflow-hidden w-[96%] " typeof="text" />
                                {!loading && (
                                    <button className="absolute duration-200 hover:bg-transparent hover:border-2 hover:border-white hover:text-white cursor-pointer right-3 p-2 top-4 bg-white/10 text-white rounded-full">
                                        <SendHorizonal />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Page;
