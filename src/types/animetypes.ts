// anime data types change or add accordingly 
export default interface Anime {
    id: number;
    image: string;
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
        last: string
        full: string
    }
    role: string;
    episodes: number;
}
