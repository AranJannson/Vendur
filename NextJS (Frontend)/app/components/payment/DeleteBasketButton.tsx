"use client";

export default function DeleteBasketButton() {
    
    const handleClick = async () => {

        const response = await fetch("http://localhost:8002/deletecookie", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            console.log("Removed basket");
            window.location.reload();
        } else {
            console.error("Failed to remove basket");
        }

    };

    return <div>
        <button type="submit"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleClick}
            >
                    Remove all items
        </button>
    </div>;
}