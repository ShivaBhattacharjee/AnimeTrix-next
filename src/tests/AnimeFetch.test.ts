import { getTrendingAnime, getPopularAnime, getAnimeMovies, getRandomAnime, getAiringSchedule, getCurrentYear, getUpcomingData, getGenre, getSearchResults, getAnimeDetails, getSteamingLink } from "../lib/AnimeFetch";

describe("AnimeFetch", () => {
    describe("getTrendingAnime", () => {
        it("should return an array of trending anime", async () => {
            const result = await getTrendingAnime();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getPopularAnime", () => {
        it("should return an array of popular anime", async () => {
            const result = await getPopularAnime();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getAnimeMovies", () => {
        it("should return an array of anime movies", async () => {
            const result = await getAnimeMovies();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getRandomAnime", () => {
        it("should return a random anime", async () => {
            const result = await getRandomAnime();
            expect(result).toBeDefined();
        });
    });

    describe("getAiringSchedule", () => {
        it("should return an array of airing schedules", async () => {
            const result = await getAiringSchedule();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getCurrentYear", () => {
        it("should return the current year", () => {
            const result = getCurrentYear();
            expect(result).toBe(new Date().getFullYear());
        });
    });

    describe("getUpcomingData", () => {
        it("should return an array of upcoming anime for the given season", async () => {
            const result = await getUpcomingData("summer");
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getGenre", () => {
        it("should return an array of anime for the given genre", async () => {
            const result = await getGenre("action");
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getSearchResults", () => {
        it("should return an array of anime search results for the given search value", async () => {
            const result = await getSearchResults("naruto");
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe("getAnimeDetails", () => {
        it("should return the details of one piece", async () => {
            const result = await getAnimeDetails(21);
            expect(result).toBeDefined();
        });
    });

    describe("getSteamingLink", () => {
        it("should return the streaming link for one piece", async () => {
            const result = await getSteamingLink("one-piece-episode-1");
            expect(result).toBeDefined();
        });
    });
});
