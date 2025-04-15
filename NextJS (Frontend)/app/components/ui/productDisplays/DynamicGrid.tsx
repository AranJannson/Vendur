import { createClient } from '@/utils/supabase/server'
import Link from "next/link";

export default async function DynamicGrid({ col, row }: { col: number; row: number }) {
    const supabase = await createClient();
    const { data: items } = await supabase.from('items').select('*');

    if (!items) {
        return <div>No items found</div>
    }

    return (
        <div className="bg-primary-200 m-4 rounded-lg">
            <div
                className={`grid gap-4 p-4`}
                style={{
                    gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${row}, auto)`
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative group aspect-[2/1] rounded-lg bg-secondary-100 p-2 m-10 text-center flex justify-center items-center flex-col gap-2"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width="200"
                            height="200"
                            className="aspect-square object-contain"
                        />
                        <Link href={`/products/${item.name}`}
                              className="absolute inset-0 bg-sky-300/90 flex justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2">
                            <span className="text-white text-2xl font-bold">
                                {item.name}
                                <br/>
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