'use client'
import { IoSearch } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";

const categories = [
    "Electronics & Computing",
    "Clothing & Shoes",
    "Toys & Games",
    "Home, Garden & DIY",
    "Health & Beauty"
];

export default function SearchBar() {
    const [selectedFilter, setSelectedFilter] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const search = new FormData(event.currentTarget).get("search") as string;
        const filters = selectedFilter === "category" ? `category_${selectedCategory}` : selectedFilter;
        if (!filters) {
            // Redirect with encoded query parameters
            redirect(`/search?query=${encodeURIComponent(search)}`);
            return;
        }
        // Redirect with encoded query parameters
        redirect(`/search?query=${encodeURIComponent(search)}&filters=${encodeURIComponent(filters)}`);
        console.log(encodeURIComponent(filters))
    }

    return (
        <form className="flex flex-row items-center bg-primary-300 rounded-xl w-full max-w-3xl px-4 py-2"
              name="SearchBar" onSubmit={onSubmit}>
            <IoSearch className="text-2xl ml-4"/>
            <input className="px-5 py-2 bg-transparent placeholder-black h-full w-full focus:outline-none"
                   placeholder="Search..." name="search" type="search"/>

            <select className="px-5 py-2 bg-transparent placeholder-black h-full w-full focus:outline-none"
                    name="filters"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}>
                <option value="">Filter</option>
                <option value="category">Category</option>
                <option value="price">Price</option>
                <option value="sort">Sort</option>
            </select>

            {/* Show Category Select only if 'Category' is chosen */}
            {selectedFilter === "category" && (
                <select className="px-5 py-2 bg-transparent placeholder-black h-full w-full focus:outline-none"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            )}
        </form>
    );
}
