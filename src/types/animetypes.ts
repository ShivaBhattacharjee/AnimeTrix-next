export default interface Anime {
    id: number;
    image: string;
    title: {
        userPreferred?: string;
        english?: string;
        romaji?: string;
        native?: string;
    };
    countryOfOrigin: string;
    type: string;
    genres: string[];
    totalEpisodes: number;
    status: string;
    relationType: string;
}
