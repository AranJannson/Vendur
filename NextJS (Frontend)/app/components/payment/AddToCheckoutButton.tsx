"use client";

export default function AddToCheckoutButton( { item, quantity }: { item: any, quantity: string }) {
    
    const handleClick = async () => {

        // docker doesn't like spaces
        const sanitizedItemName = (item.name).replace(/\s+/g, "_");
        
        const response = await fetch("http://localhost:8002/setcookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: sanitizedItemName,
                value: JSON.stringify({
                    itemId: item.id, 
                    price: item.discount === null || item.discount === 0 ? ( item.price ) : ((item.price * (1 - item.discount / 100))),
                    quantity: quantity,
                    size: item.category === "clothing" ? item.size : null
                })
            }),
        });

        if (response.ok) {
            console.log("Item added to basket");
        } else {
            console.error("Failed to add item");
        }
    };

    return <div>
        <button type="submit"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleClick}
            >
                    Add to checkout
        </button>
    </div>;
}
