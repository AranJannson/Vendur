import { connect } from "./dbConnect"

export const fetchAllReviews = async (item_id : any): Promise<any> => {
    const supabase = connect();

    const { data } = await supabase.from('reviews').select().eq('item_id', item_id);
    return data;
}

export const fetchReview = async (review_id : any): Promise<any> => {
    const supabase = connect();

    const { data } = await supabase.from('reviews').select().eq('id', review_id);
    return data;
}