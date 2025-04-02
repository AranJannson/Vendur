import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import StarRating from "@/app/components/product/StarRating";
import ProductList from "@/app//products/productList";

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
            <ProductList items={productsWithRatings || [] } />
        </div>
    );
}
