import Link from "next/link";

export default function HeroProduct({ url, text }: { url: string; text: string }) {
  return (
    <span className="flex flex-col gap-2 justify-center items-center">
      <div className="relative w-80 h-80 flex flex-row bg-primary-100 w-fit rounded-xl p-4 w-[500px] break-words">
        <img
          src={url}
          alt={text}
          className="w-fit aspect-square h-full object-contain rounded-lg"
        />

        <div className="flex flex-col text-center justify-center items-center content-center">

          <div>
            <p className="font-bold text-3xl">{text}</p>
          </div>

          <div>
            <Link href={`/products/${text}`} className="bg-secondary-300/50 flex justify-center items-center rounded-xl cursor-pointer m-2 bottom-0 right-0 absolute m-3 transition-colors hover:bg-secondary-400  duration-500">
              <span className="text-black/50 text-sm font-semibold p-2 px-4 hover:text-black/100">
                View Details
              </span>
            </Link>
          </div>

        </div>

        {/* <Link href={`/products/${text}`} className="absolute inset-0 bg-sky-300/90 flex justify-center items-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2">
          <span className="text-white text-2xl font-bold">
              {text}
          </span>
        </Link> */}
      </div>
    </span>
  );
}
