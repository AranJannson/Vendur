import {connect} from "./dbConnect";


export default async function checkStock(item_id: number){
    const supabase = connect();

    try{
        const { data, error } = await supabase.from('stock').select('item_id, quantity').eq('item_id', item_id);


        return data;

    }catch (error){
        console.log(error);
        return error;
    }





}