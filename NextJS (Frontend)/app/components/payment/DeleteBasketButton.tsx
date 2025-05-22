"use client";
import { useState } from "react";
import {useUser} from "@stackframe/stack";

export default function DeleteBasketButton() {
    const [loading, setLoading] = useState(false);

    const userId = useUser()?.id;
    
    const handleDelete = async () => {
        try {

            setLoading(true);
            
            const response = await fetch("/api/deleteBasket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user_id: userId})
            });

            if(!response){
                console.log("Failed To Delete Basket")
            }

            if(response){
                console.log("Basket Deleted")
            }

        } catch (error) {
            console.error("Failed to remove basket");
        } finally {
            setLoading(false);
            window.location.reload()
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