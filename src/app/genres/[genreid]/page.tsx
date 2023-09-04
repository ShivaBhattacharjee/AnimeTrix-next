import { getGenre } from "@/lib/AnimeFetch";
import React from "react";
import ServerError from "@/components/error/ServerError";
import VerticalCards from "@/components/shared/cards/VerticalCards";
const page = async ({ params }: { params: { genreid: string } }) => {
    const genre = await getGenre(params.genreid);
    return <>{genre && Object.keys(genre).length > 0 ? <VerticalCards title={params.genreid} data={genre} isGenre={true} GenreName={params.genreid} /> : <ServerError />}</>;
};

export default page;
