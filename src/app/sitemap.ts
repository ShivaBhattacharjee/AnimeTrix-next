import { MetadataRoute } from "next";

import { getTrendingAnime } from "@/lib/AnimeFetch";
import Anime from "@/types/animetypes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const anime = await getTrendingAnime();
    const animeEntries: MetadataRoute.Sitemap = anime.map(({ id, title }: Anime) => ({
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/watch/${title.userPreferred}/${id}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
    }));

    return [
        {
            url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        ...animeEntries,
    ];
}
