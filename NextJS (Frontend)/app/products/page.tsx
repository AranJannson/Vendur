import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import StarRating from "@/app/components/product/StarRating";

export const metadata = {
    title: "Products | Vendur",
    description: "",
};

export default async function Products() {
    const supabase = await createClient();
    const { data: items, error} = await supabase.from("items").select("*");

    if (error || !items) {
        console.error("Error fetching items:", error.message);
        return <div>Error loading items.</div>;
    }
    const productsWithRatings = await Promise.all(
        items.map(async (item) => {
            const { data: ratings, error: ratingsError } = await supabase.from("reviews").select("rating").eq("item_id", item.id).limit(1);

            if (ratingsError && ratingsError.code !== "PGRST116") {//No rating
                console.error("Error fetching rating", ratingsError.message);
                return { ...item, rating: 0 };
            }

            if (!ratings || ratings.length === 0) {
                return { ...item, rating: 0 };
            }

            const rating = ratings[0]?.rating ?? 0;
            return { ...item, rating };
        })
    );

    return (
        <div className="bg-background-100 w-full p-4">
            <h1 className="text-4xl font-bold text-center mb-6">All Products</h1>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            {productsWithRatings.map((item) => (
                    <Link
                        key={item.id}
                        href={`/products/${item.name}`}
                        className="relative aspect-3/2 rounded-xl rounded-lg bg-secondary-50 p-2 grid grid-cols-1 transition-colors border-2 border-primary-400 hover:bg-secondary-300  hover:border-primary-500"
                    >
                        <div className="flex flex-row justify-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                width={150}
                                height={150}
                                className="aspect-square object-contain"
                            />

                        </div>
                        <div className="flex flex-col justify-center mt-2 items-center">
                                <h3 className="text-2xl text-text-950 font-semibold">{item.name}</h3>

                                {item.discount === null || item.discount === 0 ? (
                                    <p className="text-xl font-semibold">£{item.price.toFixed(2)}</p>
                                ) : (
                                    <div>
                                        <div>
                                            <p className="text-xl mb-2 text-center">
                                                <s className="text-gray-500">£{item.price.toFixed(2)}</s>
                                                <span className="ml-2 text-red-500 font-bold">
                                                    £{(item.price * (1 - item.discount / 100)).toFixed(2)}
                                                </span>
                                            </p>
                                        </div>

                                        
                                    </div>
                                    
                                )}
                                {item.discount === null || item.discount === 0 ? (
                                    null
                                ) : (<div className="flex justify-center text-center items-center">
                                    <p className="font-semibold p-1 w-[150px] bg-red-400 rounded-xl p-1">Limited Time Deal</p>
                                </div>)}
                                <div className="w-fit p-1 bg-secondary-500 gap-15 rounded-xl mt-2"><StarRating rating={item.rating}/></div>
                        </div>

                        {/* <div className="flex justify-end">
                            <div className="bg-primary-300 rounded-xl p-2">
                                <h3 className="font-bold border-b-2 border-black">Details</h3>
                                <p className="text-gray-600 text-sm">Item ID: {item.id}</p>
                                <p className="text-sm">{`Rating: ${item.rating}`}</p>
                            </div>
                        </div> */}
                    </Link>
                ))}
            </div>
        </div>
    );
}
