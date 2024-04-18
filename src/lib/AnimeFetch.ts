import { AnifyApi, AnimeApi, StreamApi } from "./animeapi/animetrixapi";
import { myCache } from "./nodecache";
// trending anime
export const getTrendingAnime = async () => {
    const cacheKey = "trendingAnime";
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const response = await fetch(`${AnimeApi}/trending?perPage=24`);
        const data = await response.json();
        myCache.set(cacheKey, data.results); // Cache the results
        return data.results;
    } catch (error) {
        console.error("Error fetching trending anime:", error);
        return [];
    }
};

// popular anime
export const getPopularAnime = async () => {
    const cacheKey = "popularAnime";
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnimeApi}/popular?perPage=24`);
        const data = await response.json();
        myCache.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error("Error fetching popular anime:", error);
        return [];
    }
};
// get anime movies
export const getAnimeMovies = async () => {
    const cacheKey = "animeMovies";
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnimeApi}/MOVIE?perPage=24`);
        const data = await response.json();
        myCache.set(cacheKey, data.results);
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
        const response = await fetch(`${AnifyApi}/schedule?type=anime&fields=[title,id,coverImage,airingEpisode,airingAt]`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting airing list: ", error);
        return [];
    }
};

// upcoming seasons
export const getCurrentYear = () => {
    return new Date().getFullYear();
};

/**
 * Fetches upcoming anime data based on the specified season and current year.
 * @param {string} season - The season to search for upcoming anime (e.g. "summer", "fall").
 * @returns {Promise<Array>} - A promise that resolves to an array of upcoming anime data.
 */
export const getUpcomingData = async (season: string) => {
    const cacheKey = `upcoming${season}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnimeApi}/advanced-search?season=${season}&&year=${getCurrentYear()}`);
        const data = await response.json();
        myCache.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error("Error fetching upcoming seasons:", error);
        return [];
    }
};

// get anime genre
export const getGenre = async (genre: string) => {
    const cacheKey = `genre${genre}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnimeApi}/advanced-search?genres=["${genre}"]`);
        const data = await response.json();
        myCache.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.log("Error fetching anime genre", error);
        return [];
    }
};
// search anime
export const getSearchResults = async (searchValue: string) => {
    const cacheKey = `search${searchValue}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnimeApi}/${searchValue}`, {
            cache: "force-cache",
        });
        const data = await response.json();
        myCache.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.log("Error fetching anime search results", error);
        return [];
    }
};

// get anime details
export const getAnimeDetails = async (animeid: number) => {
    const cacheKey = `details${animeid}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnifyApi}/info/${animeid}?fields=[coverImage,status,bannerImage , genres,title  , relations  , averageRating , description , type , format , year , totalEpisodes]`, {
            cache: "no-cache",
        });
        const data = await response.json();
        myCache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Error fetching details:", error);
        return [];
    }
};

export const getAnimeRelation = async (animeid: number) => {
    const cacheKey = `relation${animeid}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnifyApi}/relations/${animeid}?fields=[id,coverImage, status  ,currentEpisode , totalEpisodes , title]`);
        const data = await response.json();
        myCache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.log("Error fetching anime relation", error);
        return [];
    }
};

export const getSteamingLink = async (streamid: string) => {
    const cacheKey = `stream${streamid}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${StreamApi}/stream/${streamid}`, {
            cache: "no-cache",
        });
        const data = await response.json();
        myCache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.log("Error getting streaming links", error);
        return [];
    }
};

export const getDownloadLink = async (streamid: string) => {
    const cacheKey = `download${streamid}`;
    try {
        const cachedData = myCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`${AnimeApi}/watch/${streamid}`);
        const data = await response.json();
        myCache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.log("Error getting download links", error);
        return [];
    }
};
