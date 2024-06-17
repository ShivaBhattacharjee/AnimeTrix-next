import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getTrendingAnime } from "@/lib/AnimeFetch";

export function generateMetadata() {
    return {
        title: "Trending Anime - Discover the Hottest Shows on AnimeTrix",
        description: "Explore the hottest trending anime series and movies right here at Trending Anime! Stay up-to-date with the latest and most popular titles in the world of anime. Dive into a world of excitement, adventure, and stunning animation with our carefully curated selection.",
    };
}
export default async function page() {
    const trending = await getTrendingAnime();
    // The title should not be changed as it is required for infinite scroll.
    return <>{trending.length > 0 ? <VerticalCards title={"Trending"} data={trending} /> : <ServerError />}</>;
}
