"use client"
import Link from "next/link";
import { UserButton } from "@stackframe/stack";

export default function Header() {
    return (
        <header className="text-center bg-background-main border-b-2 border-background-900">
            <div className="grid grid-cols-2 ">

                <div className="flex justify-start p-6">
                    <h3 className="font-bold">Vendur</h3>
                </div>

                <div className="flex justify-end font-bold">
                    <ul className="flex flex-row gap-5 p-6 items-center">
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
                            <UserButton /> {/* TODO: Fix sign-in/sign-out going to wrong URL */}
                        </li>
                    </ul>
                </div>

            </div>
        </header>
    );
}