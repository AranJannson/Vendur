import { connect } from "./dbConnect"

const supabase = connect();


export async function modifyStockQuantity(item_id: number, quantity: number){

    const { error } = await supabase
        .from('stock')
        .update({ quantity })
        .eq('item_id', item_id)

    if(error) throw error;

}