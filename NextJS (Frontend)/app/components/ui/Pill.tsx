import Link from 'next/link';

export default function Pill({ text }: { text: string }) {
    return (
        <Link href={`/search?query=${text}`} className="my-6 p-3 px-6 bg-secondary-300 w-fit px-3 rounded-2xl font-bold m-4 transition-colors hover:bg-secondary-400 hover:cursor-pointer">

            {text}

        </Link>
    );
}