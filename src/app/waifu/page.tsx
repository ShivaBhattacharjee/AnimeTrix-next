import Link from "next/link";
const waifus = [
    {
        name: "Hinata",
        picture: "https://i.pinimg.com/564x/38/d4/97/38d4976a7bf28851320a8e1f2f8ad89f.jpg",
        anime: "Naruto",
    },
    {
        name: "Tsunade",
        picture: "https://i.pinimg.com/564x/60/5f/47/605f4721f7885c19addaa310e215cd78.jpg",
        anime: "Naruto",
    },
    {
        name: "Maki",
        picture: "https://i.pinimg.com/564x/4b/96/dc/4b96dcc46a995c565a5157ca04f1e377.jpg",
        anime: "Jujutsu Kaisen",
    },
    {
        name: "Makima",
        picture: "https://i.pinimg.com/564x/6c/ff/d5/6cffd5f0ce7a4b7550fe03ce74afe349.jpg",
        anime: "Chainsaw Man",
    },
    {
        name: "Yor Forger",
        picture: "https://i.pinimg.com/736x/ec/e9/d9/ece9d9960070002127226f88d3c51930.jpg",
        anime: "Spy X Family",
    },
    {
        name: "Fubuki",
        picture: "https://i.pinimg.com/564x/75/9b/ef/759bef99acd8774419b06c82eedfb96f.jpg",
        anime: "One Punch Man",
    },
    {
        name: "Mitsuri Kanroji",
        picture: "https://i.pinimg.com/736x/18/80/71/188071cb99c0f069dac86f4bd10180b3.jpg",
        anime: "Demon Slayer",
    },
    {
        name: "Yoruichi",
        picture: "https://i.pinimg.com/736x/42/44/a0/4244a0e2a113e90d0f10118c18aed91c.jpg",
        anime: "Bleach",
    },
    {
        name: "Rangiku",
        picture: "https://i.pinimg.com/564x/30/c8/75/30c8752ff4aa9051c63c3c06d2a186a2.jpg",
        anime: "Bleach",
    },
    {
        name: "Orihime Inoue",
        picture: "https://i.pinimg.com/564x/62/50/e1/6250e18e9b9ba2440cc8c06dd027d77a.jpg",
        anime: "Bleach",
    },
    {
        name: "Raiden shogun",
        picture: "https://i.pinimg.com/736x/16/c2/4a/16c24afdb5d417baadc0e6c2cbec4d00.jpg",
        anime: "Genshin Impact",
    },
    {
        name: "Akeno Himejima",
        picture: "https://i.pinimg.com/564x/83/5a/ec/835aec7eb5a26e54fb5885e9e15b3280.jpg",
        anime: "High School DxD",
    },
    {
        name: "Mai Sakurajima",
        picture: "https://i.pinimg.com/564x/03/be/18/03be185ebb4c5f5df33d973df4a2e5f3.jpg",
        anime: "Bunny Girl Senpai",
    },
    {
        name: "Rin Tohsaka",
        picture: "https://i.pinimg.com/564x/35/1d/6b/351d6b4c8701f56fdc365db99a9d67bc.jpg",
        anime: "Fate",
    },
    {
        name: "Jeanne d'Arc",
        picture: "https://i.pinimg.com/564x/08/3f/5c/083f5cd7c65779a5c00a2445194ee858.jpg",
        anime: "Fate",
    },
    {
        name: "Kagome hirugashi",
        picture: "https://i.pinimg.com/564x/11/ec/f9/11ecf9b6d700e98b36235dc232d612df.jpg",
        anime: "Inuyasha",
    },
    {
        name: "Nobara Kugisaki",
        picture: "https://i.pinimg.com/736x/a9/2d/f4/a92df4be8570e078667609445d8632ff.jpg",
        anime: "Jujutsu Kaisen",
    },
    {
        name: "Asuka Langley Soryu",
        picture: "https://i.pinimg.com/736x/fe/aa/cf/feaacf20e0e2202142efaa22411ab1ea.jpg",
        anime: "Neon Genesis Evangelion",
    },
    {
        name: "Sanji",
        picture: "https://i.pinimg.com/564x/d6/88/d6/d688d6432ffacca0cfafc6979318eca7.jpg",
        anime: "One Piece",
    },
    {
        name: "Issei Hyoudou",
        picture: "https://i.pinimg.com/564x/a0/d6/b7/a0d6b722a2d573266e103da9409e849c.jpg",
        anime: "High School DxD",
    },
    {
        name: "Jiraya",
        picture: "https://i.pinimg.com/564x/33/29/9f/33299fa56af8052a8d8ec22ce5cd6805.jpg",
        anime: "Naruto",
    },
];
const page = () => {
    return (
        <section className="min-h-screen p-4 mb-40 flex flex-col gap-2 ">
            <h1 className=" font-bold text-3xl">Select Your Waifu</h1>
            <p className=" opacity-70 font-medium text-lg">More coming soon...</p>
            <div className="flex justify-center items-center flex-wrap gap-4">
                {waifus.map((value, index) => (
                    <Link href={`/waifu/${value?.name || ""}/${value.anime || " "}`} key={index} className="flex justify-center items-center flex-col group duration-200">
                        <img src={value.picture} alt={value?.name || "Unknown"} className="lg:w-32 border-2 group-hover:scale-75 duration-100 lg:h-32 w-24 h-24 rounded-full" />
                        <span className=" font-bold mt-2 tracking-wide uppercase">{value?.name || "Unknown"}</span>
                        <span className="text-sm opacity-70 font-medium">{value?.anime || "Unknown"}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default page;
