import { connect } from "./dbConnect"

// Review functions
export const fetchAllReviews = async (item_id : any): Promise<any> => {
    const supabase = connect();

    const { data } = await supabase.from('reviews').select().eq('item_id', item_id);
    return data;
}

export const reviews = async (review_id : any): Promise<any> => {
    const supabase = connect();

    const { data } = await supabase.from('reviews').select().eq('id', review_id);
    return data;
}

// Make review
export const makeReview = async (item_id: any, rating: any, reviewText: any): Promise<any> => {
    const supabase = connect();

    const { data } = await supabase.from('reviews').insert([{ item_id: item_id, rating: rating, reviewText: reviewText }]);
    return data;
}