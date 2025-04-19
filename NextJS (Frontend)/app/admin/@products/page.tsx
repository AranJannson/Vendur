"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";


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
    const supabase = createClient();
    const [products, setProducts] = useState<Item[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("items").select("*");
            if (error) {
                console.error("Error fetching items:", error);
            } else {
                setProducts(data);
            }
        };

        fetchProducts();
    }, [supabase]);

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
                                <Link href={`/products/${product.id}`} className="bg-secondary-500 rounded-lg p-2 transition-colors hover:bg-secondary-400">
                                    Details
                                </Link>
                                <Link href={`#`} className="bg-secondary-500 rounded-lg p-2 transition-colors hover:bg-secondary-400">
                                    Remove Product
                                </Link>
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
