"use client";

import { modifyStock, postItem, setOriginalStock } from "@/utils/catalogue/utils";

export default function AddToCheckoutButton( { item, formId, originalStock }: { item: any, formId: string, originalStock: number }) {
    
    const handleClick = async () => {
        try {
        const form = document.getElementById(formId) as HTMLFormElement;
        const quantityInput = form?.querySelector("input[name='quantity']") as HTMLInputElement;
        const selectedQuantity = quantityInput ? Number(quantityInput.value) : 1;
        const sizeInput = form?.querySelector("select[name='size']") as HTMLInputElement;
        const size = sizeInput ? String(sizeInput.value) : null;

        setOriginalStock(item.id, originalStock);
        const[itemResponse, stockResponse] = await Promise.all([postItem(item, selectedQuantity, size), modifyStock(item, -selectedQuantity)]);
        
    } catch (error) {
        console.error("Failed to add item: ", error);
    } finally {
        window.location.reload();
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