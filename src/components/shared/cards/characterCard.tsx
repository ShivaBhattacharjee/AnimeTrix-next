import ContentNotFound from "@/components/error/Contentnotfound";
import Anime from "@/types/animetypes";

export default function CharacterCard({ characters }: { characters: Anime[] }) {
    return (
        <>
            {characters.length > 0 ? (
                <>
                    <h1 className=" text-4xl font-bold mb-4">Characters</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 max-h-96 overflow-y-scroll hiddenscroll  gap-5 2xl:grid-cols-4">
                        {characters.map((anime: Anime, index: number) => (
                            <div key={index} className="dar:bg-white/10 bg-black/10 border-white/40  border-2 rounded-lg items-center p-4 flex justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={anime.image || "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"} alt={`an image of ${anime?.name || "Unknown"}`} className="w-20 rounded-lg" loading="lazy" />
                                    <div className="flex gap-3 flex-col">
                                        <h1 className="font-bold text-2xl">{anime?.name || "Unknown"}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h1 className=" text-4xl font-bold mb-4">Characters</h1>
                    <ContentNotFound message="Characters" />
                </>
            )}
        </>
    );
}
