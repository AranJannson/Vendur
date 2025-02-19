"use client"
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import { useTheme } from "next-themes";
import { FormEvent } from 'react'
import { IoSearch } from "react-icons/io5";

export default function Header() {
    const { theme, setTheme } = useTheme();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert(event.target);
    }

    return (
        <header className="text-center bg-primary-400 border-b-2 border-background-900 ">
            <div className="grid grid-cols-2 items-center">

                <div className="flex justify-start p-6">
                    <h3 className="font-bold">Vendur</h3>
                </div>

                <div className="flex justify-end font-bold">
                    <ul className="flex flex-row gap-5 p-6 items-center">
                        <li>
                            <form className="flex flex-row justify-center items-center bg-gray-900/60  rounded-lg" name="SearchBar" onSubmit={onSubmit}>
                                <IoSearch className="text-2xl ml-4"/>
                                <input className="px-10 py-2 bg-transparent" placeholder="Search..." name="search" type="search"/>
                            </form>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-gray-500">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-gray-500">
                                Page 2
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-gray-500">
                                Page 3
                            </Link>
                        </li>
                        <li>
                            <UserButton
                                colorModeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            /> {/* TODO: Fix sign-in/sign-out going to wrong URL */}
                        </li>
                    </ul>
                </div>

            </div>
        </header>
    );
}