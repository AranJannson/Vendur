'use client';

import { useEffect, useState } from "react";
import ShopCard from "@/app/components/org/ShopCard";
import Link from "next/link";

interface Org {
    name: string;
    desc?: string;
    description?: string;
}

export default function VendurSpotlight() {
    const [orgs, setOrgs] = useState<Org[]>([]);

    useEffect(() => {
        const fetchOrgs = async () => {
            try {
                const response = await fetch('/api/getAllVerifiedOrgs', {
                    method: 'GET',
                    cache: 'no-store',
                });

                const data = await response.json();

                const orgList = Array.isArray(data) ? data : data.data;

                setOrgs(orgList);

            } catch (error) {
                console.error("Failed to fetch organisations:", error);
            }
        };

        fetchOrgs();
    }, []);

    return (
        <div className="flex flex-col h-fit items-center justify-center content-center md:flex-row bg-background-100 p-4 md:p-8 rounded-lg shadow-2xl m-4 w-[90%] mx-auto">
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 w-[50rem]">
                <h1 className="text-3xl font-bold text-gray-800">Vendur Spotlight</h1>
                <p className="text-gray-600 w-44">Get to know the best vendurs in the market</p>
                <Link href="/organisations" className="bg-primary-300 font-bold px-4 py-2 rounded-lg mt-4 transition-colors hover:bg-primary-400">
                    View All Vendurs
                </Link>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 h-fit gap-4">
                {orgs.slice(0, 3).map((org, index) => (
                    <ShopCard
                        key={index}
                        name={org.name}
                        link={`/organisations/${org.name}`}
                        desc={org.description || "No description provided"}
                    />
                ))}
            </div>
        </div>
    );
}
