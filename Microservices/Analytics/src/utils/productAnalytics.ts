import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function popularProductsList(){

    try{
        const { data, error } = await supabase
            .from("orders")
            .select("item_id, count", { count: "exact" })
            .order("count", {ascending:false});
            return data;

    }catch (error){
        console.error(error);
        return 0;
    }


}