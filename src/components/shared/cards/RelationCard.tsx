import Link from "next/link";

import { getAnimeDetails } from "@/lib/AnimeFetch";
import Anime from "@/types/animetypes";

interface Props {
    id: number;
    bannerImage: string;
}
export default async function RelationCard({ id, bannerImage }: Props) {
    const details = await getAnimeDetails(id);
    return (
        <>
            {details && details.relations && Object.keys(details.relations).length > 0 && (
                <section className=" sticky bottom-0 top-0">
                    <h1 className="text-4xl font-semibold pl-2">Relation & Seasons</h1>
                    <div className=" flex gap-4 hiddenscroll overflow-x-auto duration-200 mt-9">
                        {details.relations?.map((relation: Anime) => (
                            <div className="bg-white/10 flex items-center p-2 hover:cursor-pointer border-2 hover:scale-95 border-white/40  duration-200 rounded-lg" key={relation.id}>
                                <Link href={`/details/${relation?.id}`} className="flex w-80 lg:w-96">
                                    <img src={bannerImage} height={300} width={600} alt={`an image of ${relation.title.romaji || relation.title.english || relation.title.native}`} className=" w-28 h-40 aspect-square bg-cover rounded-lg " />
                                    <div className="flex text-sm p-4 flex-col  gap-3 justify-center font-semibold">
                                        <span>{relation.format}</span>
                                        <span className="font-normal">{relation.title.romaji || relation.title.english || relation.title.native}</span>
                                        <span>{relation.type}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
