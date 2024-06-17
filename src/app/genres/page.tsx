import Link from "next/link";
const genres = [
    {
        title: "Action",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    },
    {
        title: "Adventure",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/136-uHALFo2vGOGd.jpg",
    },
    // {
    //     title: "Cars",
    //     image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/185-Z724xydTic8N.jpg",
    // },
    {
        title: "Comedy",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/918-bljqHE1PFArH.jpg",
    },
    {
        title: "Drama",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    },
    {
        title: "Fantasy",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
    },
    {
        title: "Horror",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20605-RCJ7M71zLmrh.jpg",
    },
    {
        title: "Mahou Shoujo",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/9756-d5M8NffgJJHB.jpg",
    },
    {
        title: "Mecha",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99423-xu78CeWOO5FW.jpg",
    },
    {
        title: "Music",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20665-j4kSsfhfkM24.jpg",
    },
    {
        title: "Mystery",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21234-7lfSSPoMmwr2.jpg",
    },
    {
        title: "Psychological",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
    },
    {
        title: "Romance",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/14813-urImBxyWJUEw.jpg",
    },
    // {
    //     title: "Sci-fi",
    //     image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
    // },
    {
        title: "Slice of Life",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
    },
    {
        title: "Sports",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20464-PpYjO9cPN1gs.jpg",
    },
    {
        title: "Supernatural",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20447-nlgQQzcgWbgw.jpg",
    },
    {
        title: "Thriller",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/108632-yeLbrgPN4Oni.jpg",
    },
];
export function generateMetadata() {
    return {
        title: "Anime by Genre - Find Your Perfect Story on AnimeTrix",
        description: "Discover anime tailored to your tastes with our Anime by Genre section. Whether you're into action, romance, fantasy, or any other genre, we've got you covered. Explore a world of anime that speaks to your preferences and passions. With our genre-based categorization, you can easily find the perfect story that resonates with you. ",
        openGraph: {
            images: "https://media.discordapp.net/attachments/1079039236302446705/1148974653155594302/IMG_20230906_190222_412.jpg?width=1080&height=567",
        },
    };
}
const page = () => {
    return (
        <div className="p-4 pb-40 m-auto">
            <h1 className="md:text-5xl text-4xl mb-6 font-semibold">Genres</h1>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-4">
                {genres.map((genre, index) => (
                    <Link href={`/genres/${genre.title}`} key={index} className=" relative duration-200 cursor-pointer border-2 border-white/60 rounded hover:scale-105">
                        <img src={genre.image} alt={genre.title} className=" w-full bg-fill bg-cover h-28 md:h-40 md:w-96 z-20 duration-200 cursor-pointer hover:scale-105" />
                        <div className="absolute text-white top-0 bg-black/50 w-full h-full">
                            <p className="text-center w-full h-full translate-y-[40%] font-semibold text-xl lg:text-3xl">{genre.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default page;
