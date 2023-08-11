import React, { Suspense } from 'react';
import { Play } from 'lucide-react';

const getAiringSchedule = async () => {
    try {
        const response = await fetch(`https://api.anify.tv/schedule?apikey=${process.env.NEXT_PUBLIC_ANIFY_KEY}`,{
            cache : "no-cache"
        });
        return response.json();
    } catch (error) {
        console.error("Error getting airing list: ", error);
        return [];
    }
}

export default async function AiringSchedule() {
    const Airing = await getAiringSchedule();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
    const currentDay = daysOfWeek[currentDayIndex];

    return (
        <div className='flex flex-col mt-9'>
            <h1 className='text-3xl lg:text-5xl font-bold'>Airing</h1>
            <div className='flex gap-2'>
                <div className="bg-white/10 h-auto max-h-[400px] w-full p-4 rounded-lg mt-5 lg:h-96 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        <h1>Coming Up Next!</h1>

                        <div className="flex justify-between">
                            <span>Previous</span>
                        <span className='text-center'>{currentDay}</span>
                        <span>Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
