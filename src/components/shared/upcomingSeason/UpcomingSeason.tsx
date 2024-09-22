import { getCurrentYear, getUpcomingData } from "@/lib/AnimeFetch";
import UpcomingSeasonCard from "./UpcomingSeasonCard";

export default async function UpcomingSeason() {
    const seasons = ["FALL", "SUMMER", "WINTER", "SPRING"];
    const animeDataPromises = seasons.map((season) => getUpcomingData(season));
    const animeDataResults = await Promise.all(animeDataPromises);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-2">{getCurrentYear()}</h2>
            <h1 className="text-4xl font-bold text-primary mb-8">Upcoming Seasons</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {seasons.map((season, index) => (
                    <UpcomingSeasonCard key={season} animeList={animeDataResults[index]} title={season.toLowerCase()} />
                ))}
            </div>
        </div>
    );
}
