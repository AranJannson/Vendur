"use client";

export default function AddToCheckoutButton( { item, formId }: { item: any, formId: string }) {
    
    const handleClick = async () => {
        try {
        const form = document.getElementById(formId) as HTMLFormElement;
        const quantityInput = form?.querySelector("input[name='quantity']") as HTMLInputElement;
        const selectedQuantity = quantityInput ? Number(quantityInput.value) : 1;
        const sizeInput = form?.querySelector("select[name='size']") as HTMLInputElement;
        const size = sizeInput ? String(sizeInput.value) : null;

        const stockResponse = await fetch(`http://localhost:8000/getStock?item_id=${item.id}`, {
            method: "GET",
            credentials: "include",
        });        

        if (!stockResponse.ok) {
            throw new Error(`Failed to fetch stock: ${stockResponse.statusText}`);
        }
        
        const stockData = await stockResponse.json();
        console.log("stockToChange: ", stockData.quantity);

        const cookieResponse = await fetch("http://localhost:8002/setcookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: "basket",
                value: {
                    id: item.id, 
                    name:item.name,
                    price: item.discount === null || item.discount === 0 ? ( item.price ) : ((item.price * (1 - item.discount / 100))),
                    image: item.image,
                    quantity: selectedQuantity,
                    size: size,
                }
            }),
        });

        if (!cookieResponse.ok) {
            throw new Error(`Failed to fetch cookie: ${cookieResponse.statusText}`);
        }

        window.location.reload();

        const quantityResponse = await fetch(`http://localhost:8000/modifyStockQuantity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                    item_id: item.id, 
                    quantity: stockData.quantity - selectedQuantity,
                })
            ,
        });

        if (!quantityResponse.ok) {
            throw new Error(`Failed to fetch quantity: ${quantityResponse.statusText}`);
        }

        } catch (error) {
            console.error("Failed to add item: ", error);
        }
    };

    return <div>
        <button type="button"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleClick}
            >
                    Add to checkout
        </button>
    </div>;
}