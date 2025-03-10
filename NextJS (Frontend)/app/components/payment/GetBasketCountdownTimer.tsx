"use client";

import { useEffect, useState } from "react";

export default function GetBasketCountdownTimer() {
    const [age, setAge] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAge() {
            try {
                const response = await fetch("http://localhost:8002/getcookieage", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch basket");
                }

                const data = await response.json();
                setAge(data);

            } catch (error) {
                console.error("Error fetching timer:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAge();
    }, []);

    if (loading) return <p>Loading timer...</p>;

    return (
        <>
            <div>Items are held for 2 hours</div>
            <div>age: { age } </div>
        </>
    );    
}
