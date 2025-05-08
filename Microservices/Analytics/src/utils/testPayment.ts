import { createClient } from "@supabase/supabase-js";

const paymentSupabase = createClient(
    process.env.PAYMENT_SUPABASE_URL as string,
    process.env.PAYMENT_SUPABASE_ANON_KEY as string
);

export async function orderData(){
    const {data, error} = await paymentSupabase
        .from("orders")
        .select("id, item_id, quantity")

    if (error){
        console.log("Error fetching data", error)
    }

    return data;
}