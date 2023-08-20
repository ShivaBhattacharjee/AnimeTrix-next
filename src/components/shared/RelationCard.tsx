import React from 'react'
import Image from 'next/image';
export default async function RelationCard({ id }: any) {
    const getRelationDetails = async () => {
        try {
            const response = await fetch(`https://animetrix-api.vercel.app/meta/anilist/info/${id}`);
            const data = await response.json();
            return data.relations;
        } catch (error) {
            console.error("Error fetching details:", error);
            return [];
        }
    };
    const details = await getRelationDetails()
    return (
        <section>
        </section>
    )

}

