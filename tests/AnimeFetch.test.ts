import { getAiringSchedule, getAnimeDetails, getAnimeMovies, getDownloadLink,getGenre, getPopularAnime, getRandomAnime, getSearchResults, getSteamingLink, getTrendingAnime, getUpcomingData } from "../src/lib/AnimeFetch";

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

    test("getRandomAnime should return an object with anime details", async () => {
        const anime = await getRandomAnime();
        expect(typeof anime).toBe("object");
        expect(anime).toHaveProperty("id");
        expect(anime).toHaveProperty("title");
        expect(anime).toHaveProperty("description");
    });

    test("getAiringSchedule should return an array of anime airing schedule", async () => {
        const anime = await getAiringSchedule();
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getUpcomingData should return an array of upcoming anime data", async () => {
        const anime = await getUpcomingData("summer");
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getGenre should return an array of anime with the specified genre", async () => {
        const anime = await getGenre("action");
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getSearchResults should return an array of anime search results", async () => {
        const anime = await getSearchResults("naruto");
        expect(Array.isArray(anime)).toBe(true);
    });

    test("getAnimeDetails should return an object with anime details", async () => {
        const anime = await getAnimeDetails(21);
        expect(typeof anime).toBe("object");
        expect(anime).toHaveProperty("id");
        expect(anime).toHaveProperty("title");
        expect(anime).toHaveProperty("description");
    });

    test("getSteamingLink should return an object with streaming links", async () => {
        const stream = await getSteamingLink("one-piece-episode-1");
        expect(typeof stream).toBe("object");
        expect(stream).toHaveProperty("id");
        expect(stream).toHaveProperty("title");
        expect(stream).toHaveProperty("links");
    });

    test("getDownloadLink should return an object with download links", async () => {
        const download = await getDownloadLink("one-piece-episode-1");
        expect(typeof download).toBe("object");
        expect(download).toHaveProperty("id");
        expect(download).toHaveProperty("title");
        expect(download).toHaveProperty("links");
    });
});
