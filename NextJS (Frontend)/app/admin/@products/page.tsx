"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteItemBtn from "@/app/components/admin/DeleteItemBtn";

export type Item = {
    id: number;
    created_at: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    discount: number | null;
    org_id: number | null;
};


export default function Products() {
    const [products, setProducts] = useState<Item[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/getItems', {
                method: 'GET',
            });
            const data = await response.json();
            setProducts(data);
        };  

        fetchProducts();
    }, []);

    return (
        <div className="aspect-[2/1] rounded-xl shadow-xl bg-primary-300 max-h-96 p-6 flex flex-col">
            <h2 className="font-bold text-2xl">Products List</h2>
            <ul className="flex-1 flex flex-col gap-4 py-4 overflow-y-auto rounded-xl">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <li
                            key={product.id ?? index}
                            className="grid grid-cols-2 bg-background-500 p-4 rounded-xl w-full"
                        >
                            <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.name} width={50} height={50} className="aspect-square object-contain"/>
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                            </div>
                            <div className="flex justify-end h-fit items-center content-center gap-4">
                                <Link href={`/products/${product.name}`} className="bg-secondary-500 rounded-lg p-2 transition-colors hover:bg-secondary-400">
                                    Details
                                </Link>
                                {product.id}
                                <DeleteItemBtn productId={product.id}/>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="flex justify-center items-center bg-background-500 p-4 rounded-xl w-full content-center text-center">
                        <span className="text-lg font-semibold h-60">No Products On Sale</span>
                    </li>
                )}
            </ul>
        </div>
    );
}
