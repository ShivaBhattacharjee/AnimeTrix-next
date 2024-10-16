"use client";

import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SyncLoader } from "react-spinners";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import axios from "axios";
import { getCookie } from "cookies-next";
import { SendHorizonal, Trash2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Toast from "@/utils/toast";
import { data } from "../../_model-data/data";
import Link from "next/link";

type Chat = {
    _id: string;
    waifuName: string;
    userMessage: string;
    waifuResponse: string;
    timestamp: string;
};

const Page = ({ params }: { params: { waifuid: string; animename: string } }) => {
    const token = getCookie("token");
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [savedChats, setSavedChats] = useState<Chat[]>([]);
    const [prevChatLoading, setPrevChatLoading] = useState(token ? true : false);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
    const msgEnd = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLInputElement>(null);

    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
    const sanitizeString = (str: string) => str.replace(/&/g, "&amp;").replace(/%20/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    const waifuid = sanitizeString(params.waifuid);

    const focusTextarea = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
                return;
            }
            const ignoredKeys = ["Control", "Alt", "Shift", "Meta", "CapsLock", "Tab"];
            if (ignoredKeys.includes(e.key)) {
                return;
            }
            focusTextarea();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [focusTextarea]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) return Toast.ErrorShowToast(`You need to login to chat with ${waifuid}`);


        try {
            setMessages((prevMessages) => [...prevMessages, { text: prompt, isBot: false }]);
            setPrompt("");
            setLoading(true);

            // Log the character we're looking for
            console.log("Looking for character:", params.waifuid);

            const characterData = data.find(char => char.name.toLowerCase() === params.waifuid.toLowerCase());

            console.log("Found character data:", characterData);

            if (!characterData) {
                throw new Error("Character data not found");
            }

            let botResponse = "";
            if (token && savedChats.length > 1) {
                const chatHistory = savedChats.flatMap((chat) => [
                    { role: "user", parts: chat.userMessage },
                    { role: "model", parts: chat.waifuResponse },
                ]);
                chatHistory.push({ role: "user", parts: prompt });
                const chat = model.startChat({ history: chatHistory, generationConfig: { maxOutputTokens: 100 } });
                const result = await chat.sendMessage(prompt);
                botResponse = result.response.text() || "";
            } else {
                console.log("Generating content with character data:", characterData.name);
                const result = await model.generateContentStream(`
                You are ${characterData.name} from ${params.animename}. Use the following information to shape your responses:

                Appearance: ${characterData.appearance}
                Backstory: ${characterData.shortBackstory}
                Self-description: ${characterData.selfDescription}
                Personality: ${characterData.personalityTraits.join(', ')}
                Tone: ${characterData.tone}
                Age: ${characterData.age}
                Likes: ${characterData.likes.join(', ')}
                Dislikes: ${characterData.dislikes.join(', ')}
                
                Respond as ${characterData.name} would, considering their personality and background. 
                Your goal is to ${characterData.conversationalGoals.join(' and ')}.

                Here are some example interactions to guide your responses:
                ${characterData.conversationalExamples.map(ex => `User: ${ex.user}\n${characterData.name}: ${ex[characterData.name.toLowerCase() as keyof typeof ex]}`).join('\n\n')}

                Remember:
                - Stay in character at all times.
                - Don't mention that you're an AI or chatbot at any cost.
                - Use a tone that matches ${characterData.tone}.
                - Occasionally reference your likes, dislikes, or backstory if relevant.

                Now, respond to the following message from the user:
                ${prompt}
                `);
                console.log("Content generation completed");
                const res = await result.response;
                botResponse = res.text() || "";
            }

            console.log("Bot response:", botResponse);
            setMessages((prevMessages) => [...prevMessages, { text: botResponse, isBot: true }]);

            if (token) {
                const bodyParams = { waifuName: waifuid, userMessage: prompt, waifuResponse: botResponse };
                await axios.post("/api/waifu", bodyParams);
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setMessages((prevMessages) => [...prevMessages, { text: "Request failed", isBot: true }]);
            Toast.ErrorShowToast("Something went wrong: " + (error instanceof Error ? error.message : String(error)));
        } finally {
            setLoading(false);
            focusTextarea();
        }
    };

    const GetAllAiChat = async () => {
        try {
            const req = await axios.get(`/api/waifu?waifuname=${waifuid}`);
            const res = req.data;
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
    }, [messages]);

    const handleChatRMRf = async () => {
        try {
            await axios.delete(`/api/waifu?waifuname=${waifuid}`);
            Toast.SuccessshowToast("Wiped all your chat history comrade");
            GetAllAiChat();
        } catch (error) {
            console.log(error);
            const ERRORMSG = error as Error;
            Toast.ErrorShowToast(ERRORMSG.message || "Failed to delete conversation");
        }
    };

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const fakeSubmitEvent = new Event("submit") as unknown as React.FormEvent<HTMLFormElement>;
            handleSubmit(fakeSubmitEvent);
        }
    };

    const characterData = data.find(char => char.name.toLowerCase() === params.waifuid.toLowerCase());

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] max-w-3xl mx-auto">
            <header className="py-3 px-4 border-b flex justify-between items-center">
                <Link href="/waifu" className="text-purple-600 hover:text-purple-800 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-semibold text-purple-600">{waifuid}</h1>
                {token && savedChats.length > 1 && (
                    <Button variant="outline" onClick={handleChatRMRf} className="flex items-center gap-1 text-sm">
                        <Trash2 size={14} />
                        Clear
                    </Button>
                )}
            </header>

            <ScrollArea className="flex-grow px-4 py-2 space-y-3">
                <AnimatePresence>
                    {prevChatLoading ? (
                        <div className="flex flex-col gap-3">
                            {[...Array(3)].map((_, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="rounded-lg p-2 shadow-sm animate-pulse">
                                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {savedChats
                                .slice()
                                .reverse()
                                .map((msg) => (
                                    <React.Fragment key={msg._id}>
                                        <ChatMessage isBot={false} content={msg.userMessage} />
                                        <ChatMessage isBot={true} content={msg.waifuResponse} characterImage={characterData?.picture} />
                                    </React.Fragment>
                                ))}
                            {messages.map((msg, index) => (
                                <ChatMessage key={index} isBot={msg.isBot} content={msg.text} characterImage={msg.isBot ? characterData?.picture : undefined} />
                            ))}
                        </>
                    )}
                </AnimatePresence>
                <div ref={msgEnd}></div>
            </ScrollArea>

            <footer className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <Input 
                        ref={textareaRef} 
                        type="text" 
                        placeholder="Type your message..." 
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        onKeyDown={handleTextareaKeyDown} 
                        className="flex-grow rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400" 
                        disabled={loading} 
                    />
                    <Button type="submit" disabled={loading} className="rounded-full p-1.5">
                        {loading ? <SyncLoader color="#ffffff" size={4} /> : <SendHorizonal size={16} />}
                    </Button>
                </form>
            </footer>
        </div>
    );
};

const ChatMessage = ({ isBot, content, characterImage }: { isBot: boolean; content: string; characterImage?: string }) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -10 }} 
        transition={{ duration: 0.2 }} 
        className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}
    >
        <div className={`flex ${isBot ? "flex-row" : "flex-row-reverse"} items-start gap-1.5 max-w-[70%]`}>
            <Avatar className="w-8 h-8">
                {isBot && characterImage ? (
                    <AvatarImage src={characterImage} alt="Character" />
                ) : (
                    <AvatarImage src={isBot ? "/waifu-avatar.png" : "/user-avatar.png"} />
                )}
                <AvatarFallback>{isBot ? "W" : "U"}</AvatarFallback>
            </Avatar>
            <div className={`rounded-lg p-2 ${isBot ? "bg-accent" : "bg-purple-500 text-white"}`}>
                <ReactMarkdown className="text-sm">{content}</ReactMarkdown>
            </div>
        </div>
    </motion.div>
);

export default Page;