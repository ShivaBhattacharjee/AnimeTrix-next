import { Camera, CarIcon, Scale, VideoIcon } from "lucide-react";

export const navItems = [
    { label: "Home", url: "/" },
    { label: "Popular", url: "/popular" },
    { label: "Trending", url: "/trending" },
];

export const staticGenres = ["Action", "Drama", "Fantasy", "Mystery", "Adventure", "Supernatural", "Psychological", "Thriller", "Comedy", "Sci-Fi", "Horror", "Romance", "Slice of Life", "Music", "Sports", "Ecchi", "Mecha", "Mahou Shoujo"];

export const menuContent = [
    {
        leftGrid: [
            {
                title: "Movies",
                description: "A series of movies",
                url: "/movie",
                icon: Camera,
            },
            {
                title: "Genre",
                description: "A series of movies",
                url: "/genre",
                icon: CarIcon,
            },
            {
                title: "Trending",
                description: "A series of movies",
                url: "/trending",
                icon: Scale,
            },
            {
                title: "Popular",
                description: "A series of movies",
                url: "/popular",
                icon: VideoIcon,
            },
        ],
        rightGrid: [
            {
                title: "Aniscan BETA",
                description: "AI that Visualized the content anime based on the scene",
                url: "/aniscan",
                image: "/cta2.jpeg",
            },
            {
                title: "Waifu Chat",
                description: "Featured chat for cultured men",
                url: "/waifu",
                image: "/waifu.webp",
            },
        ],
    },
];
