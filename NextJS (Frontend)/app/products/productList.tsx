"use client";

import { useState } from "react";
import Link from "next/link";
import StarRating from "@/app/components/product/StarRating";

interface Product {
    id: number;
    name: string;
    image: string;
    category: string;
    discount: number;
    rating: number;
    price: number;
}

interface ProductsListProps {
    items: Product[];
}

export default function ProductsList({ items }: ProductsListProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("default");
    
    const categories = ["All", ...new Set(items.map((item) => item.category))];

    const filteredItems = items.filter((item) => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesDiscount = sortOption === "discountedOnly" ? item.discount > 0 : true;
        return matchesCategory && matchesDiscount;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        const aDiscountedPrice = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
        const bDiscountedPrice = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;

        switch (sortOption) {//sort options
            case "alphabetical":
                return a.name.localeCompare(b.name);
            case "priceLowToHigh":
                return aDiscountedPrice - bDiscountedPrice;
            case "priceHighToLow":
                return bDiscountedPrice - aDiscountedPrice;
            case "discountedOnly":
                return a.discount !== null && a.discount > 0 ? -1 : 1;
            default:
                return 0;
        }
    });

    return (
        <div>
            <h1 className="text-4xl font-bold text-center md:w-auto">All Products</h1>
            
            <div className="flex items-center justify-end mb-4 flex items-center gap-2">
                <label className="text-lg font-semibold">Filter Category:</label>
                <select
                    className="border p-2 rounded-md bg-secondary-50"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-end mb-4 flex items-center gap-2">
                <label className="text-lg font-semibold">Sort by:</label>
                <select
                    className="border p-2 rounded-md bg-secondary-50"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="default">Relevance</option>
                    <option value="discountedOnly">Discounted Items</option>
                    <option value="priceLowToHigh">Price: Low - High</option>
                    <option value="priceHighToLow">Price: High - Low</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="default">Customer Reviews (WIP)</option>
                    <option value="default">Vendur Rating (WIP)</option>
                    <option value="default">New In (WIP)</option>
                </select>
            </div>
            
            <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
                {sortedItems.map((item) => (
                    <Link
                    key={item.id}
                    href={`/products/${item.name}`}
                    className="relative aspect-3/2 rounded-xl rounded-lg bg-secondary-50 p-2 grid grid-cols-1 transition-colors border-2 border-primary-400 hover:bg-secondary-300  hover:border-primary-500"
                >
                    <div className="flex flex-row justify-center">
                        <img
                            src={item.image}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="aspect-square object-contain"
                        />

                    </div>
                    <div className="flex flex-col justify-center mt-2 items-center">
                            <h3 className="text-2xl text-text-950 font-semibold">{item.name}</h3>

                            {item.discount === null || item.discount === 0 ? (
                                <p className="text-xl font-semibold">£{item.price.toFixed(2)}</p>
                            ) : (
                                <div>
                                    <div>
                                        <p className="text-xl mb-2 text-center">
                                            <s className="text-gray-500">£{item.price.toFixed(2)}</s>
                                            <span className="ml-2 text-red-500 font-bold">
                                                £{(item.price * (1 - item.discount / 100)).toFixed(2)}
                                            </span>
                                        </p>
                                    </div>
                                </div>   
                            )}
                            {item.discount === null || item.discount === 0 ? (
                                null
                            ) : (<div className="flex justify-center text-center items-center">
                                <p className="font-semibold p-1 w-[150px] bg-red-400 rounded-xl p-1">Limited Time Deal</p>
                            </div>)}
                            <div className="w-fit p-1 bg-secondary-500 gap-15 rounded-xl mt-2"><StarRating rating={item.rating}/></div>
                    </div>

                    {/* <div className="flex justify-end">
                        <div className="bg-primary-300 rounded-xl p-2">
                            <h3 className="font-bold border-b-2 border-black">Details</h3>
                            <p className="text-gray-600 text-sm">Item ID: {item.id}</p>
                            <p className="text-sm">{`Rating: ${item.rating}`}</p>
                        </div>
                    </div> */}
                </Link>
                ))}
            </div>
        </div>
    );
}
