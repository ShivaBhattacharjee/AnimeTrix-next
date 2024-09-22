// anime data types change or add accordingly
interface AnilistInfo {
    id: number;
}
export default interface Anime {
    id: number;
    image: string;
    coverImage: string;
    cover: string;
    description: string;
    color: string;
    bannerImage: string;
    format: string;
    title: {
        userPreferred: string;
        english: string;
        romaji: string;
        native: string;
    };
    countryOfOrigin: string;
    type: string;
    genres: string[];
    totalEpisodes: number;
    status: string;
    relationType: string;
    number: number;
    name: string;

    role: string;
    episodes: number;
    length: number;
    filename: string;
    episode: number;
    from: number;
    similarity: number;
    rating: number;
    anilist: AnilistInfo;
    video: string;
}
// required for aniscan
export interface ApiResponse {
    frameCount: number;
    error: string;
    result: Anime[];
}
export type HistoryItem = {
    streamId: string;
    animeId: number;
    image: string;
    coverImage: string;
    episode: string;
    title: string;
    _id: string;
};

export interface UserHistory {
    history: HistoryItem[];
}

export interface UserHistoryResponse {
    nextPage: boolean;
    history: HistoryItem[];
    userHistory: UserHistory;
}

export type UserData = {
    username: string;
    profilePicture: string;
    email: string;
    userDescription: string;
};

export type getTopAiringAnimeProps = {
    id: string;
    title: string;
    image: string;
    url: string;
    genres: string[];
};

// Anilist meta
export type Anilist = {
    id: string;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
    };
    image: string;
    trailer?: {
        id: string;
        site: string;
        thumbnail: string;
    };
    description: string;
    status: string;
    cover: string;
    rating: number;
    releaseDate: number;
    color: string;
    genres: string[];
    totalEpisodes: number;
    duration?: number;
    type: string;
};

export interface AdvanceSearchProps {
    id: string;
    malId: number;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
    };
    status: string;
    image: string;
    cover: string;
    popularity: number;
    totalEpisodes: number;
    currentEpisode: number | null;
    countryOfOrigin: string;
    description: string;
    genres: Genre[];
    rating: number;
    color: string;
    type: string;
    releaseDate?: number;
    trailer?: {
        id: string;
        site: string;
        thumbnail: string;
    };
    duration?: number;
}

export type Genre = "Action" | "Drama" | "Fantasy" | "Mystery" | "Adventure" | "Supernatural" | "Psychological" | "Thriller" | "Comedy" | "Sci-Fi" | "Horror" | "Romance" | "Slice of Life" | "Music" | "Sports" | "Ecchi" | "Mecha" | "Mahou Shoujo";

export interface AdvancedSearchResponse {
    currentPage: number;
    hasNextPage: boolean;
    totalPages: number;
    totalResults: number;
    results: AdvanceSearchProps[];
}

export interface AnimeSearchResult {
    id: string;
    title: string;
    url: string;
    image: string;
    duration: string;
    japaneseTitle: string;
    type: string;
    nsfw: boolean;
    sub: number;
    dub: number;
    episodes: number;
}

export interface AnimeSearchResponse {
    currentPage: number | null;
    hasNextPage: boolean;
    totalPages: number | null;
    results: AnimeSearchResult[];
}
