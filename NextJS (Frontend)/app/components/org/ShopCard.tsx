import Link from "next/link";
import Image from 'next/image';
export default function VendurCard({ name, link, desc, image }: { name: string; link: string, desc: string, image?: string }) {
    return (
        <div className="flex flex-col p-2 bg-primary-200 rounded-lg shadow-md m-4 overflow-hidden aspect-3/4 h-fit w-fit">
            <Image
                src={image || "https://dummyimage.com/600x900/fff/000.png"}
                alt={name}
                width={600}
                height={900}
                className="object-cover w-full h-auto rounded-lg shadow-xl"
            />
            <div className="p-2 bg-primary-100 rounded-lg shadow-md m-4 h-32">
                <h1 className="text-lg font-bold">{name}</h1>
                {/*<p className="text-gray-600">{desc}</p>*/}
                <div  className="flex bottom-0 mt-8">
                    <Link href={link} className="mt-2 border border-gray-400/50 rounded-md italic px-3 py-1 text-black transition duration-200 bg-primary-300 hover:bg-primary-400">
                    View Store
                    </Link>
                </div>
            </div>
        </div>
    );
}


