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

const GenreLoading = () => {
    return (
        <div className="p-4 pb-40 w-full">
            <h1 className="md:text-5xl text-4xl mb-6 font-semibold">Genres</h1>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-4">
                {genres.map((index) => (
                    <div key={index.title} className=" relative duration-200 cursor-pointer hover:scale-105">
                        <div className=" h-24 w-full bg-white animate-pulse  bg-cover md:h-44 md:w-64 2xl:w-80 rounded-lg z-20 duration-200 cursor-pointer hover:scale-105" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreLoading;
