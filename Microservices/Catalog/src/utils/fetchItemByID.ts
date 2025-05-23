import { connect } from "./dbConnect"

const supabase = connect();

export async function fetchItemsByID(id: string){
    console.log(`Fetching item with ID: ${id}`);
    const { data } = await supabase.from("items").select("*").eq("id", id).single()
    if (!data) {
        throw new Error(`Item with ID ${id} not found`);
    }
    return data;

}