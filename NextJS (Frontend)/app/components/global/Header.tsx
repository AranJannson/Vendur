"use client"
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import { useTheme } from "next-themes";
import VendurLogo from "../ui/VendurLogo";
import SearchBar from "@/app/components/global/SearchBar";

export default function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="text-center bg-primary-200 border-b-2 light:border-background-900 dark:border-background-400 ">
            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                <div className="flex -mt-4 md:justify-start justify-center p-6">
                    <VendurLogo/>
                </div>

                <div className="flex md:justify-center w-full">
                 <SearchBar />
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
                        <li>
                            <Link href="/payment" className="transition-colors hover:text-primary-600">
                                Basket
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </header>
    );
}