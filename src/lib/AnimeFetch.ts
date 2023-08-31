import { AnifyApi, AnimeApi } from "./animeapi/animetrixapi";
// trending anime
export const getTrendingAnime = async () => {
    try {
        const response = await fetch(`${AnimeApi}/trending?perPage=24`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching trending anime:", error);
        return [];
    }
};
// popular anime
export const getPopularAnime = async () => {
    try {
        const response = await fetch(`${AnimeApi}/popular?perPage=24`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching popular anime:", error);
        return [];
    }
};
// get anime movies
export const getAnimeMovies = async () => {
    try {
        const response = await fetch(`${AnimeApi}/MOVIE?perPage=24`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching anime movies:", error);
        return [];
    }
};

// get random anime
export const getRandomAnime = async () => {
    try {
        const response = await fetch(`${AnimeApi}/random-anime`, {
            cache: "no-store",
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching random anime:", error);
        return null;
    }
};

// get airing schedule
export const getAiringSchedule = async () => {
    try {
        const response = await fetch(`${AnifyApi}/schedule?apikey=${process.env.NEXT_PUBLIC_ANIFY_KEY}`, {
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Error getting airing list: ", error);
        return [];
    }
};
// upcoming seasons
export const getCurrentYear = () => {
    return new Date().getFullYear();
};

export const getUpcomingData = async (season: string) => {
    try {
        const response = await fetch(`${AnimeApi}/advanced-search?season=${season}&&year=${getCurrentYear()}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching upcoming seasons:", error);
        return [];
    }
};
// get search results
export const getSearchResults = async (query: any) => {
    try {
        const response = await fetch(`${AnimeApi}/${{ query }}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching anime details", error);
        return [];
    }
};
// get anime details
export const getAnimeDetails = async (animeid: number) => {
    try {
        const response = await fetch(`${AnimeApi}/info/${animeid}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching details:", error);
        return [];
    }
};
