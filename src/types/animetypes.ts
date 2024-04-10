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
