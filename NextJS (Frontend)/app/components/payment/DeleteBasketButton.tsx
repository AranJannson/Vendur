"use client";
import { revertStock } from "@/utils/catalogue/utils";
import { useState } from "react";

export default function DeleteBasketButton({basket, refreshBasket}: {basket: any[], refreshBasket: any}) {
    const [loading, setLoading] = useState(false);
    
    const handleDelete = async () => {
        try {

            setLoading(true);
            
            await fetch("http://localhost:8002/deletecookie", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            
            basket.forEach((item) => {
                revertStock(item);
            })

        } catch (error) {
            console.error("Failed to remove basket");
        } finally {
            refreshBasket();
            setLoading(false);
        }

    };

    if (loading) return <p>Loading delete...</p>;

    return <div>
        <button type="button"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleDelete}
            >
                    Remove all items
        </button>
    </div>;
}