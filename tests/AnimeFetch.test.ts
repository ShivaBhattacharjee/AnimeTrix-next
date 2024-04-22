import { getAiringSchedule, getAnimeDetails, getAnimeMovies, getDownloadLink, getGenre, getPopularAnime, getSearchResults, getSteamingLink, getTrendingAnime, getUpcomingData } from "@/lib/AnimeFetch";

describe("AnimeFetch functions", () => {
    test("getTrendingAnime should return an array of anime", async () => {
        const anime = await getTrendingAnime();
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getPopularAnime should return an array of anime", async () => {
        const anime = await getPopularAnime();
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getAnimeMovies should return an array of anime movies", async () => {
        const anime = await getAnimeMovies();
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getAiringSchedule should return an object of anime airing schedule with days of the week", async () => {
        const anime = await getAiringSchedule();

        expect(typeof anime).toBe("object");
        expect(Object.keys(anime).length).toBeGreaterThan(0);

        const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        for (const day of daysOfWeek) {
            expect(anime).toHaveProperty(day);
            expect(Array.isArray(anime[day])).toBe(true);
        }
    });

    test("getUpcomingData should return an array of upcoming anime data", async () => {
        const anime = await getUpcomingData("SUMMER");
        expect(Array.isArray(anime)).toBe(true);
        expect(anime.length).toBeGreaterThan(0);
    });

    test("getGenre should return an array of anime with the specified genre", async () => {
        const anime = await getGenre("Action");
        expect(Array.isArray(anime)).toBe(true);
        expect(anime.length).toBeGreaterThan(0);
    });

    test("getSearchResults should return an array of anime search results", async () => {
        const anime = await getSearchResults("Bleach"); //feel free to change to any other anime
        expect(Array.isArray(anime)).toBe(true);
        expect(anime.length).toBeGreaterThan(0);
    });

    test("getAnimeDetails should return an object with anime details", async () => {
        const anime = await getAnimeDetails(21);
        expect(typeof anime).toBe("object");
        expect(anime).toHaveProperty("title");
        expect(anime).toHaveProperty("description");
    });

    test("getSteamingLink should return an object with streaming links", async () => {
        const stream = await getSteamingLink("one-piece-episode-1");
        expect(typeof stream).toBe("object");
        expect(stream).toHaveProperty("info");
        expect(stream.info).toHaveProperty("title");
        expect(stream).toHaveProperty("stream");
    });

    test("getDownloadLink should return an object with download links", async () => {
        const download = await getDownloadLink("one-piece-episode-1");
        expect(typeof download).toBe("object");
        expect(download).toHaveProperty("download");
        expect(download).toHaveProperty("sources");
        expect(Array.isArray(download.sources)).toBe(true);
        expect(download.sources.length).toBeGreaterThan(0);

        download.sources.forEach((source: unknown) => {
            expect(source).toHaveProperty("url");
        });
    });
});
