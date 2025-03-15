"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const filters = searchParams.get("filters");

    const [data, setData] = useState(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&filters=${encodeURIComponent(filters)}`, );
                if (!response.ok) throw new Error("Failed to fetch data");

                const result = await response.json();
                setData(result);
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                console.error("Error fetching data:", error?.message);
            }
        };

        fetchData();
    }, [query]);
    
    return (
        <div className="m-2">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-expect-error*/}
                {data?.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/products/${item.name}`}
                        className="relative max-h-52 w-full rounded-lg bg-secondary-200 p-4 grid grid-cols-2 gap-10 transition-colors border-2 border-primary-400 hover:bg-secondary-300  hover:border-primary-500"
                    >
                        <div className="flex flex-row">
                            <img
                                src={item.image}
                                alt={item.name}
                                width={150}
                                height={150}
                                className="aspect-square object-contain"
                            />

                            <div className="flex flex-col justify-center mt-2">
                                <h3 className="text-2xl font-semibold">{item.name}</h3>

                                {item.discount === null || item.discount === 0 ? (
                                    <p className="text-xl font-semibold">£{item.price.toFixed(2)}</p>
                                ) : (
                                    <div>
                                        <p className="text-xl mb-2">
                                            <s className="text-gray-500">£{item.price.toFixed(2)}</s>
                                            <span className="ml-2 text-red-500 font-bold">
                                                    £{(item.price * (1 - item.discount / 100)).toFixed(2)}
                                                </span>
                                        </p>
                                        <span>
                                                <p className="font-semibold p-1 bg-red-400 rounded-lg ">Limited Time Deal</p>
                                            </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-primary-300 rounded-xl p-2">
                                <h3 className="font-bold border-b-2 border-black">Details</h3>
                                <p className="text-gray-600 text-sm">Item ID: {item.id}</p>
                                <p className="text-sm">{`Rating: ${item.rating}`}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
