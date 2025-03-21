import {createClient} from "@supabase/supabase-js";
import { reduceEachTrailingCommentRange } from "typescript";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Product with most reviews
export async function mostReviewedProduct(){
    const { data, error } = await catalogSupabase
        .from("review")
        .select("id, item:items!id (name)");

    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }

    let total = 0;
    data.forEach((item) => {
        console.log(item.item);
        // Checks if item.item (price) is an array or object and acts accordingly
        const id = item.id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[0]?.name
            : (item.item as { name: string }).name;


    })

    return total;
}
