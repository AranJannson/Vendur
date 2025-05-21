"use client"
import Link from "next/link";
import {UserButton, useUser} from "@stackframe/stack";
import VendurLogo from "../ui/VendurLogo";
import SearchBar from "@/app/components/global/SearchBar";
import { RiShoppingBasket2Line } from "react-icons/ri";

import {useEffect, useState} from "react";

export default function Header() {

    // const [basketLength, setBasketLength] = useState(0);
    // TODO: Get basket length and display as a badge
    // const { user } = useUser();
    // useEffect(() => {
    //     // Get the basket from the API routes
    //     const fetchBasket = async () => {
    //         try {
    //             const response = await fetch("/api/getBasketNew", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ user_id: user?.id }),
    //             });
    //
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch basket");
    //             }
    //
    //             const data = await response.json();
    //             setBasketLength((data.items).length);
    //         } catch (error) {
    //             console.error("Error fetching basket:", error);
    //         }
    //     };
    //     fetchBasket();
    // }, []);
    //
    // console.log(user?.id)
    // console.log(`Basket Length : ${basketLength}`)

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

                        <li className="rounded-full bg-primary-400 text-black p-2 hover:bg-primary-500 transition-colors hover:cursor-pointer">
                            <Link href="/basket" className="relative inline-block">
                                <RiShoppingBasket2Line className="text-3xl" />
                                {/*{basketLength > 0 && (*/}
                                {/*    <p className="absolute bottom-0 right-0 bg-primary-800 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full translate-x-1/2 translate-y-1/2 leading-none font-bold">*/}
                                {/*        {basketLength}*/}
                                {/*    </p>*/}
                                {/*)}*/}
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