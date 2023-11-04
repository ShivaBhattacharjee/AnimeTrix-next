import React from "react";

import AiringScheduleCard from "./AiringScheduleCard";

import { getAiringSchedule } from "@/lib/AnimeFetch";

export default async function AiringSchedule() {
    const Airing = await getAiringSchedule();
    return (
        <div className="flex flex-col mt-9">
            <h1 className="text-3xl lg:text-5xl font-bold">Airing Schedule</h1>
            <AiringScheduleCard airingData={Airing} />
        </div>
    );
}
