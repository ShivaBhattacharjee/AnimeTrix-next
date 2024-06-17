import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
import { getPopularAnime } from "@/lib/AnimeFetch";

export function generateMetadata() {
    return {
        title: "Popular Anime - Dive into the Best Anime Series on AnimeTrix",
        description: "Delve into the world of beloved anime with our Popular Anime section. Discover the all-time favorite anime series and movies that have captured the hearts of fans worldwide. From timeless classics to modern masterpieces, our collection showcases the best of the best. ",
    };
}
export default async function page() {
    const Popular = await getPopularAnime();
    return <>{Popular.length > 0 ? <VerticalCards title={"Popular"} data={Popular} /> : <ServerError />}</>;
}
