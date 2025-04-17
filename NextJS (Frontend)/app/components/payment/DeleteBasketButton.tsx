"use client";

export default function DeleteBasketButton({refreshBasket}: {refreshBasket: any}) {
    
    const handleDelete = async () => {
        try {
            await fetch("http://localhost:8002/deletecookie", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            console.log("working here");

            refreshBasket();
        } catch (error) {
            console.error("Failed to remove basket");
        }

    };

    return <div>
        <button type="submit"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleDelete}
            >
                    Remove all items
        </button>
    </div>;
}