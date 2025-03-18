import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

export async function lowStock(){

    try{
        const { data, error } = await supabase.from("stock").select("*").lt("quantity", 10);
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }


}








