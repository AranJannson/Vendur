import Link from "next/link";

export default function Footer() {
    return (
        <footer className="text-center bg-background-1000 border-t-2 border-background-900 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
                <div className="flex flex-row">
                    <div className="flex flex-col gap-4 ml-4">
                        <h2 className="text-4xl font-bold text-left">Vendur</h2>
                        <p className="md:text-left text-center md:border-b-0 border-b-2 pb-4 md:pb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Quisque at quam tincidunt felis gravida commodo.
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
                                <Link href="#" className="hover:text-gray-500">
                                    Page 2
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-500">
                                    Page 3
                                </Link>
                            </li>
                        </div>


                    </ul>

                    <ul className="flex flex-col gap-5 justify-start md:text-left text-center">
                        <h3 className="font-bold text-2xl">Information</h3>

                        <div className="flex flex-row md:flex-col justify-center gap-6 md:gap-3">
                            <li>
                                <Link href="#" className="hover:text-gray-500">
                                    Page 4
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
                                <Link href="#" className="hover:text-gray-500">
                                    Page 7
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-500">
                                    Page 8
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-500">
                                    Page 9
                                </Link>
                            </li>
                        </div>

                    </ul>

                </div>
            </div>

            <div className="mt-10 mb-0 p-2">
                <p className="text-text-100">Copyright © 2025 Group Name - All Rights Reserved.</p>
            </div>

        </footer>
    );
}