"use client";
import React, { FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SyncLoader } from "react-spinners";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Bomb, SendHorizonal } from "lucide-react";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

type Chat = {
    _id: string;
    waifuName: string;
    userMessage: string;
    waifuResponse: string;
    timestamp: string;
};

const Page = ({ params }: { params: { waifuid: string; animename: string } }) => {
    const token = getCookie("token");
    const [message, setMessage] = useState<{ text?: string; isBot: boolean }[]>(() => [{ text: "", isBot: true }]);
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [savedChats, setSavedChats] = useState<Chat[]>([]);
    const [prevChatLoading, setPrevChatLoading] = useState(token ? true : false);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
    const msgEnd = React.useRef<HTMLDivElement>(null);

    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
    const sanitizeString = (str: string) => str.replace(/&/g, "&amp;").replace(/%20/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    const waifuid = sanitizeString(params.waifuid);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const text = prompt;
            setPrompt("");
            if (prompt.length > 1) {
                setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]);
                setLoading(true);

                let botResponse = "";
                if (token && savedChats.length > 1) {
                    const chatHistory = [];
                    savedChats.forEach((chat) => {
                        chatHistory.push({ role: "user", parts: chat.userMessage });
                        chatHistory.push({ role: "model", parts: chat.waifuResponse });
                    });
                    chatHistory.push({ role: "user", parts: prompt });
                    const chat = model.startChat({ history: chatHistory, generationConfig: { maxOutputTokens: 100 } });
                    // console.log(chat);
                    const result = await chat.sendMessage(prompt);
                    console.log(result);
                    botResponse = result.response.text() || "";
                } else {
                    const result = await model.generateContentStream(`
                        Before responding make sure to follow these rules:
                        1. You are a bot designed to act like anime characters.
                        2. You can suggest anime and review anime content.
                        3. You are ${params.waifuid} from ${params.animename} and should act like ${params.waifuid}.
                        4. If anyone asks who created you, respond with "I am a chatbot under Animetrix that acts like anime characters."
                        ${prompt}`);
                    const res = await result.response;
                    botResponse = res.text() || "";
                }

                setMessage((prevMessages) => [...prevMessages, { text: botResponse, isBot: true }]);

                if (token) {
                    const bodyParams = { waifuName: waifuid, userMessage: prompt, waifuResponse: botResponse };
                    try {
                        const req = await axios.post("/api/waifu", bodyParams);
                        const res = req.data;
                        console.log(res);
                    } catch (error: unknown) {
                        const errorMsg = error as Error;
                        Toast.ErrorShowToast(errorMsg.message || "Error saving history");
                        console.error(error);
                    }
                }
            } else {
                Toast.ErrorShowToast("Message cannot be empty");
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setMessage((prevMessages) => [...prevMessages, { text: "Request failed", isBot: true }]);
            Toast.ErrorShowToast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const GetAllAiChat = async () => {
        try {
            const req = await axios.get(`/api/waifu?waifuname=${waifuid}`);
            const res = req.data;
            console.log(res);
            setSavedChats(res.chats);
            setPrevChatLoading(false);
        } catch (error: unknown) {
            const ErrorMsg = error as Error;
            Toast.ErrorShowToast(ErrorMsg.message || "Failed to load history");
            setPrevChatLoading(false);
        }
    };

    useEffect(() => {
        if (token) GetAllAiChat();
    }, []);

    useEffect(() => {
        msgEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const handleChatRMRf = async () => {
        try {
            const req = await axios.delete(`/api/waifu?waifuname=${waifuid}`);
            const res = req.data;
            Toast.SuccessshowToast("Wiped all your chat history comrade");
            console.log(res);
            GetAllAiChat();
        } catch (error) {
            console.log(error);
            const ERRORMSG = error as Error;
            Toast.ErrorShowToast(ERRORMSG.message || "Failed to delete conversation");
        }
    };

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const fakeSubmitEvent = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
            handleSubmit(fakeSubmitEvent);
        }
    };

    return (
        <>
            {prevChatLoading ? (
                <section className="flex flex-col gap-2 p-2">
                    <h1 className="text-xl bg-black w-full font-bold text-center">Loading....</h1>
                    <div className="mt-7 mb-32 flex flex-col gap-3">
                        {/* Placeholder content while loading */}
                        {[...Array(12)].map((_, index) => (
                            <div key={index} className={`break-words w-[90%] h-10 md:w-[50%] lg:w-[40%] bg-white/40 animate-pulse text-sm flex gap-7 ${index % 2 === 0 ? "self-end" : "self-start"} p-3 rounded-lg`}></div>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="min-h-[92vh] lg:p-8 p-2 mb-32 w-full relative text-white overflow-y-scroll flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <h1 className={`text-xl bg-black w-full font-bold ${!token && "text-center"}`}>{waifuid}</h1>
                        {token && savedChats.length > 1 && (
                            <button onClick={handleChatRMRf} className="flex text-sm gap-2 w-56 text-center font-normal items-center p-3 rounded-lg bg-red-500">
                                <Bomb size={20} />
                                Delete Convo
                            </button>
                        )}
                    </div>
                    {/* Chat body */}
                    <div className="overflow-y-scroll mb-14 h-[90%] w-full max-w-full">
                        <div className="flex flex-col mb-9 mt-9 relative">
                            {savedChats.length > 0 &&
                                savedChats
                                    .slice()
                                    .reverse()
                                    .map((msg) => (
                                        <React.Fragment key={msg._id}>
                                            <div className="break-words self-end px-3 py-3">
                                                <div className="bg-white/10 text-white w-auto font-bold rounded-lg break-words p-4">
                                                    <ReactMarkdown>{msg.userMessage}</ReactMarkdown>
                                                </div>
                                            </div>
                                            <div className="break-words self-start px-3 py-3">
                                                <div className="bg-white/20 text-white rounded-lg p-4">
                                                    <ReactMarkdown>{msg.waifuResponse}</ReactMarkdown>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                            {message.map((msg, index) => (
                                <React.Fragment key={index}>
                                    {msg.text !== "" && (
                                        <div className={`break-words ${msg.isBot ? "self-start" : "self-end"} px-3 py-3`}>
                                            <div className={`${msg.isBot ? "bg-white/20 text-white rounded-lg" : "bg-white/10 text-white w-auto font-bold rounded-lg"} p-4 rounded-lg whitespace-pre-wrap`} style={{ wordBreak: "break-all" }}>
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            </div>
                                            <div ref={msgEnd}></div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                            {loading && (
                                <div className="flex flex-col gap-2 p-2">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className={`break-words w-[90%] h-10 md:w-[50%] lg:w-[40%] bg-white/40 animate-pulse text-sm flex gap-7 self-start p-3 rounded-lg`}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full flex-col m-auto gap-3 justify-center items-center">
                        <form onSubmit={handleSubmit} className="border-2 fixed z-20 lg:w-[60%] w-[95%] md:w-[80%] md:bottom-10 bottom-[7.5rem] m-auto left-0 right-0 md:left-20 lg:left-48 border-white/10 flex gap-7 flex-wrap justify-between bg-black/80 max-h-20 rounded-lg p-6 overflow-hidden">
                            <div className="w-full">
                                {loading ? (
                                    <div className="flex font-semibold tracking-wide gap-4 w-full text-center justify-center items-center">
                                        Typing <SyncLoader color="#fff" size={3} />
                                    </div>
                                ) : (
                                    <>
                                        <textarea onKeyDown={handleTextareaKeyDown} placeholder="Enter a message" rows={1} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)} className="border-0 font-medium bg-transparent outline-none overflow-hidden w-[96%]" />
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
            )}
        </>
    );
};

export default Page;
