import { createClient } from '@/utils/supabase/server'
import Link from "next/link";

export default async function OneByThree() {
    const supabase = await createClient();
    const { data: items } = await supabase.from('items').select('*');

    if (!items) {
        return <div>No items found</div>
    }

    return (
        <div className="bg-primary-200 m-4 rounded-lg">
            <h2 className="text-4xl font-semibold text-center p-4">Offers</h2>
            <div className="grid grid-cols-3 grid-rows-1">
                {items.slice(0, 3).map((item, index) => (
                    <div
                        key={index}
                        className="relative group aspect-square rounded-lg bg-secondary-100 p-2 m-10 text-center flex justify-center items-center flex-col gap-2"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width="200"
                            height="200"
                            className="aspect-square object-contain"
                        />
                        <Link href={`/products/${item.name}`} className="absolute inset-0 bg-sky-300/90 flex justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2">
                            <span className="text-white text-2xl font-bold">
                                {item.name}
                                <br />
                                £{item.price.toFixed(2)}
                            </span>
                        </Link>
                        <h2 className="font-bold text-xl">{`£ ${item.price.toFixed(2)}`}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}