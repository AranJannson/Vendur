import Link from "next/link";

export default function HeroProduct({ url, text }: { url: string; text: string }) {
  return (
    <span className="flex flex-col gap-2 justify-center items-center">
      <div className="relative w-80 h-80 group">
        <img
          src={url}
          alt={text}
          className="w-full h-full object-contain rounded-lg shadow-xl"
        />

        <Link href={`/products/${text}`} className="absolute inset-0 bg-sky-300/90 flex justify-center items-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2">
          <span className="text-white text-2xl font-bold">
              {text}
          </span>
        </Link>
      </div>
    </span>
  );
}
