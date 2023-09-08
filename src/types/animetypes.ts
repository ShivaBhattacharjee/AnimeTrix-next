// anime data types change or add accordingly
interface AnilistInfo {
    id: number;
}
export default interface Anime {
    id: number;
    image: string;
    cover: string;
    description: string;
    color: string;
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
    name: {
        first: string;
        last: string;
        full: string;
    };
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
