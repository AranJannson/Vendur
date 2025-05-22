"use client"
import { ChangeEvent } from "react";

export default function ProductQuantity(availableQuantity: number, formId: string) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length > 2) {
            event.preventDefault();
        }
        console.log(`Quantity changed to: ${value}`);
    }
    return (
        <input
            id={formId}
            onChange={handleChange}
            type="number"
            defaultValue="1"
            max={availableQuantity < 10 ? availableQuantity : 10}
            min="1"
            className="p-2 bg-primary-200 rounded-full w-20"
            name="quantity"
        />
    )
}