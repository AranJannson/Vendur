"use client"
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import { useTheme } from "next-themes";
import { FormEvent } from 'react'
import { IoSearch } from "react-icons/io5";
import VendurLogo from "../ui/VendurLogo";

export default function Header() {
    const { theme, setTheme } = useTheme();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert(event.target);
    }

    return (
        <header className="text-center bg-primary-200 border-b-2 light:border-background-900 dark:border-background-400 ">
            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                <div className="flex -mt-4 md:justify-start justify-center p-6">
                    <VendurLogo/>
                </div>

                <div className="flex md:justify-center w-full">
                    <form className="flex flex-row items-center bg-primary-300 rounded-lg w-full max-w-lg px-4 py-2"
                          name="SearchBar" onSubmit={onSubmit}>
                        <IoSearch className="text-2xl ml-4"/>
                        <input className="md:px-10 px-5 py-2 bg-transparent placeholder-black focus:outline-none"
                               placeholder="Search..." name="search" type="search"/>
                    </form>
                </div>

                <div className="flex md:justify-end justify-center font-bold ">
                    <ul className="flex flex-row gap-5 p-6 items-center">

                        <li>
                            <Link href="/" className="transition-colors hover:text-primary-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className="transition-colors hover:text-primary-600">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="transition-colors hover:text-primary-600">
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