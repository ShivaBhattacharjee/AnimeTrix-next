import UpcomingSeasonCard from "./UpcomingSeasonCard";

import { getCurrentYear, getUpcomingData } from "@/lib/AnimeFetch";

export default async function UpcomingSeason() {
    const seasons = ["FALL", "SUMMER", "WINTER", "SPRING"];
    const animeDataPromises = seasons.map((season) => getUpcomingData(season));
    const animeDataResults = await Promise.all(animeDataPromises);

    return (
        <div className="mt-6">
            <h1 className="lg:text-3xl opacity-60">{getCurrentYear()}</h1>
            <h1 className="text-3xl lg:text-5xl pb-6">Upcoming</h1>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {seasons.map((season, index) => (
                    <UpcomingSeasonCard props={animeDataResults[index]} title={season.toLowerCase()} key={season} />
                ))}
            </div>
        </div>
    );
}
