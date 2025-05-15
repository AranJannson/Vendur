import Link from "next/link";

export default function Footer() {
    return (
        <footer className="text-center bg-primary-200 border-t-2 light:border-background-900 dark:border-background-400 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
                <div className="flex flex-row">
                    <div className="flex flex-col gap-4 ml-4">
                        <h2 className="text-4xl font-bold md:text-left text-center">Vendur</h2>
                        <p className="md:text-left text-center md:border-b-0 border-b-2 pb-4 md:pb-0">Your one-stop shop for everything you need. Providing ease, and convenience.
                        </p>
                    </div>
                    <span className="border-l-2 ml-4 border-gray-500 h-36 block md:visible invisible"/>
                </div>

                <div className="md:ml-6 md:mt-0 mt-6 grid md:grid-cols-3 md:gap-5 gap-8">

                    <ul className="flex flex-col gap-5 justify-start md:text-left text-center">
                        <h3 className="font-bold text-2xl">Pages</h3>

                        <div className="flex flex-row md:flex-col justify-center gap-6 md:gap-3">
                            <li>
                                <Link href="/" className="hover:text-gray-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-gray-500">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/organisations" className="hover:text-gray-500">
                                    Vendurs
                                </Link>
                            </li>
                        </div>


                    </ul>

                    <ul className="flex flex-col gap-5 justify-start md:text-left text-center">
                        <h3 className="font-bold text-2xl">Vendurs</h3>

                        <div className="flex flex-row md:flex-col justify-center gap-6 md:gap-3">
                            <li>
                                <Link href="/organisations/management" className="hover:text-gray-500">
                                    Org Management
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-500">
                                    Page 5
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-500">
                                    Page 6
                                </Link>
                            </li>
                        </div>

                    </ul>

                    <ul className="flex flex-col gap-5 justify-start md:text-left text-center">
                        <h3 className="font-bold text-2xl">Categories</h3>

                        <div className="flex flex-row md:flex-col justify-center gap-6 md:gap-3">
                            <li>
                                <Link href="/products?category=Electronics+%26+Computing&sort=relevance" className="hover:text-gray-500">
                                    Electronics & Computing
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Clothing%2520%2526%2520Shoes&sort=relevance" className="hover:text-gray-500">
                                    Clothing & Shoes
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Health%2520%2526%2520Beauty&sort=relevance" className="hover:text-gray-500">
                                    Health & Beauty
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Toys%2520%2526%2520Game&sort=relevance" className="hover:text-gray-500">
                                    Toys & Games
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Home%252C%2520Garden%2520%2526%2520DIY&sort=relevance" className="hover:text-gray-500">
                                    Home, Garden & DIY
                                </Link>
                            </li>
                        </div>

                    </ul>

                </div>
            </div>

            <div className="mt-10 mb-0 p-2">
                <p className="text-text-800">Copyright © 2025 Group UG-3 - All Rights Reserved.</p>
            </div>

        </footer>
    );
}