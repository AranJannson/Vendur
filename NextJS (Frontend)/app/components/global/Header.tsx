"use client"
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import VendurLogo from "../ui/VendurLogo";
import SearchBar from "@/app/components/global/SearchBar";
import { RiShoppingBasket2Line } from "react-icons/ri";

export default function Header() {

    return (
        <header className="text-center bg-background-100 border-b-2 border-background-400 ">
            <div className="flex md:flex-row flex-col justify-between items-center w-full">
                
                <div className="flex -mt-4 md:justify-start justify-center p-3 pb-1 pt-3">
                    <VendurLogo/>
                </div>

                <div className="flex justify-center w-full px-6">
                    <SearchBar/>
                </div>

                <div className="flex md:justify-end justify-center font-bold">
                    <ul className="flex flex-row gap-5 p-6 items-center">

                        <li>
                            <Link href="/products" className="transition-colors hover:text-primary-600">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/organisations" className="transition-colors hover:text-primary-600">
                                Vendurs
                            </Link>
                        </li>

                        <li className="text-2xl rounded-full bg-primary-400 text-black p-2 hover:bg-primary-500 transition-colors hover:cursor-pointer">
                            <Link href="/payment">
                                <RiShoppingBasket2Line />
                            </Link>
                        </li>

                        <li>
                            <UserButton/>
                        </li>
                    </ul>
                </div>

            </div>
        </header>
    );
}