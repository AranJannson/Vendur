"use client";

export default function DeleteItemButton({ item }: { item: any }) {
    
    const handleClick = async () => {

        const response = await fetch("http://localhost:8002/deletevalue", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id: item.id, size: item.size }),
        });

        if (response.ok) {
            console.log("Removed item");
            window.location.reload();
        } else {
            console.error("Failed to remove item");
        }

    };

    return <div>
        <button type="submit"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleClick}
            >
                    Remove this item
        </button>
    </div>;
}