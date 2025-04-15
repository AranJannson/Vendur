import { connect } from "./dbConnect"
const supabase = connect();
// Review functions
export const fetchAllReviews = async (item_id : any): Promise<any> => {
    const supabase = connect();

    const { data } = await supabase.from('reviews').select().eq('item_id', item_id);
    return data;
}

export const reviews = async (review_id : any): Promise<any> => {

    const { data } = await supabase.from('reviews').select().eq('id', review_id);
    return data;
}

// Make review
export const makeReview = async (item_id: any, rating: any, reviewText: any, user_id: any): Promise<any> => {

    const { data } = await supabase.from('reviews').insert([{ item_id: item_id, rating: rating, reviewText: reviewText, user_id: user_id}]);
    return data;
}

export const checkIfItemHasReview = async (item_id: any): Promise<any> => {

    const { data: ratings, error: ratingsError } = await supabase.from("reviews").select("rating").eq("item_id", item_id).limit(1);

    return ratings;

}