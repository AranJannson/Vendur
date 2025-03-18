"use client";

export default function AddToCheckoutButton( { item, formId }: { item: any, formId: string }) {
    
    const handleClick = async () => {

        const form = document.getElementById(formId) as HTMLFormElement;
        const quantityInput = form?.querySelector("input[name='quantity']") as HTMLInputElement;
        const quantity = quantityInput ? Number(quantityInput.value) : 1;

        const response = await fetch("http://localhost:8002/setcookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: "basket",
                value: JSON.stringify({
                    id: item.id, 
                    name:item.name,
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