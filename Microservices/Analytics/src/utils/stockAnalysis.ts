import {createClient} from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

export async function inventoryValue(){
    const { data, error } = await catalogSupabase
        .from("stock")
        .select("quantity, item:items!id (price)");

    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }
    return data;
}