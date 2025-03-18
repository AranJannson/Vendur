import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function fetchAllProducts(){

    const { data } = await supabase?.from("items").select("*");

    return data;

}