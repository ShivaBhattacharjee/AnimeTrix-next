"use client";
import { useEffect, useState } from "react";
import { AxiosError } from "axios"; // Import AxiosError type

import AiringScheduleCard from "./AiringScheduleCard";

import AiringScheduleLoading from "@/components/loading/AiringScheduleLoading";
import { getAiringSchedule } from "@/lib/AnimeFetch";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export default function AiringSchedule() {
    const [airingData, setAiringData] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAiringSchedule();
                setAiringData(data);
                setLoading(false);
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 429 && retryCount < MAX_RETRIES) {
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        fetchData();
                    }, RETRY_DELAY);
                    setLoading(true);
                } else {
                    console.error("Error fetching airing schedule:", axiosError);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [retryCount]);

    return (
        <>
            {loading ? (
                <AiringScheduleLoading />
            ) : (
                <div className="flex flex-col mt-9">
                    <h1 className="text-3xl lg:text-5xl font-bold">Airing Schedule</h1>
                    {airingData && <AiringScheduleCard airingData={airingData} />}
                </div>
            )}
        </>
    );
}
