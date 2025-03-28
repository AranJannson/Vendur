import Link from "next/link";
import Image from 'next/image';
export default function VendurCard({ name, link }: { name: string; link: string }) {
    return (
        <div className="flex flex-col p-2 bg-primary-200 rounded-lg shadow-md m-4 overflow-hidden aspect-3/4 h-fit w-fit">
            <Image
                src={`/vendur-${name}.png`}
                alt={name}
                width={100}
                height={200}
                className="object-cover w-full h-auto rounded-lg shadow-xl"
            />
            <div className="p-2 bg-primary-100 rounded-lg shadow-md m-4 h-32">
                <h1 className="text-lg font-bold">{name}</h1>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Link href={link} className="flex justify-end">
                    <button className="mt-2 border border-gray-400/50 rounded-md italic px-3 py-1 text-gray-600 transition duration-200 hover:bg-gray-300">
                    View Store
                    </button>
                </Link>
            </div>
        </div>
    )
}


