import { connect } from "./dbConnect"

const supabase = connect();

export async function fetchCatalouge(){

    const { data } = await supabase.from("items").select("*");

    return data;
}


export async function fetchOrgProducts(org_id: number){

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