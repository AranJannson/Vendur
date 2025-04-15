import { createClient } from '@/utils/supabase/server'
import Link from "next/link";

export default async function FourByFour({title} : {title: string}) {
    const supabase = await createClient();
    const { data: items } = await supabase.from('items').select('*').eq('category', title);

    if (!items) {
        return <div>No items found</div>
    }

    return (
        <div className="bg-primary-200 m-4 rounded-xl">

            <div className="bg-primary-300 p-4 rounded-t-xl rounded-b-xl">
                <h2 className="text-2xl font-bold text-center">{title}</h2>
            </div>


            <div className="grid grid-cols-2 grid-rows-2 aspect-square rounded-lg">
                {items.slice(0, 4).map((item, index) => (
                    <Link
                        key={index}
                        href={`/products/${item.name}`}
                        className="relative group aspect-square rounded-xl bg-secondary-100 p-2 m-10 text-center flex justify-center items-center flex-col gap-5"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width="200"
                            height="200"
                            className="aspect-square object-contain"
                        />

                        <div className="absolute inset-0 bg-sky-500/90 flex justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2">
                            <span className="text-white text-2xl font-bold">
                                {item.name}
                                <br />
                                £{item.price.toFixed(2)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}