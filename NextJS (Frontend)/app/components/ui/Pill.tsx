import Link from 'next/link';

export default function Pill({ text }: { text: string }) {
    return (
        <Link
            href={{pathname: '/products', query: { category: text, sort: "relevance" },}}
            className="my-6 p-3 px-6 bg-secondary-300 w-fit rounded-2xl font-bold m-4 transition-colors hover:bg-secondary-500 hover:cursor-pointer"
        >
            {text}
        </Link>
    );
}