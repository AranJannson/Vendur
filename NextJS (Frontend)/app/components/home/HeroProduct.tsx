import Image from "next/image";
import Link from "next/link";

export default function HeroProduct({ url, text }: { url: string; text: string }) {
    return (
        <span className="flex flex-col gap-2 justify-center items-center">
            <div className="relative w-full md:w-5/6 h-auto aspect-[4/3] group">
                <Image
                    src={url}
                    alt={text}
                    fill
                    className="object-cover rounded-lg shadow-xl"
                />

                <div className="absolute inset-0 bg-sky-300/90 flex justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2">
                    <span className="text-white text-2xl font-bold">
                        <Link href={`/search?query=${text}`}>
                            {text}
                        </Link>
                    </span>
                </div>
            </div>
        </span>
    );
}
