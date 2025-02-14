import Link from 'next/link';

export default function NavButton({ title, href }: { title: string, href: string }) {
    return (
        <div className="my-10">
            <Link
                href={href}
                className="bg-primary-400 hover:bg-primary-300 rounded-lg p-6 shadow-5xl transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-primary-300"
            >
                {title}
            </Link>
        </div>
    );
}
