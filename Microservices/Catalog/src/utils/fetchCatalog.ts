import { connect } from "./dbConnect"
import {createClient} from "@supabase/supabase-js";

let supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

export async function fetchCatalouge(){

    const { data } = await supabase.from("items").select("*");

    return data;
}


export async function fetchOrgProducts(org_id: string){

    const { data } = await supabase.from("items").select("*").eq("org_id", org_id);

    return data;

}

export async function fetchStock(item_id: number) {

    const { data } = await supabase.from("stock").select("*").eq("item_id", item_id).maybeSingle();

    return data;

}

export async function fetchItemsBasedOnCategory(category: string){

    const { data } = await supabase.from("items").select("*").eq("category", category);

    return data;

}