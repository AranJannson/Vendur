"use client";

import { useEffect, useState } from "react";

interface Item {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: (string & { length: 1 }) | null;
}

export default function GetBasket() {
    const [basket, setBasket] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBasket() {
            try {
                const response = await fetch("http://localhost:8002/getcookie", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch basket");
                }

                const data: Item[] = await response.json();
                setBasket(data);
            } catch (error) {
                console.error("Error fetching basket:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBasket();
    }, []);

    if (loading) return <p>Loading basket...</p>;

    return (
        <div>
            <h2>Basket:</h2>
            {basket && Array.isArray(basket) && basket.length > 0 ? (
                <ul>
                    {basket.map((item, index) => (
                        <li key={index} className="mb-4">
                            <h2 className="text-xl font-bold">{item.name}</h2>
                            <p>{item.id}</p>
                            <p className="text-green-600">Price: ${item.price}</p>
                            {item.size && <p>Size: ${item.size}</p>}
                            <p>Quantity: ${item.quantity}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in basket.</p>
            )}
        </div>
    );    
}
