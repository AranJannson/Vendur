'use client'
import {IoSearch} from "react-icons/io5";
import {FormEvent} from "react";
import {redirect} from "next/navigation";

export default function SearchBar() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const search = new FormData(event.currentTarget).get("search") as string;
        redirect(`/search?query=${search}`);
    }

    return (
        <form className="flex flex-row items-center bg-primary-300 rounded-xl w-full max-w-lg px-4 py-2"
              name="SearchBar" onSubmit={onSubmit}>
            <IoSearch className="text-2xl ml-4"/>
            <input className="md:px-10 px-5 py-2 bg-transparent placeholder-black focus:outline-none"
                   placeholder="Search..." name="search" type="search"/>
        </form>
    );
}