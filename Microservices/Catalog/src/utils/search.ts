import { connect } from "./dbConnect";

export default async function searchCatalogue(query: string) {

    const supabase = connect();

    // const {data, error} = await supabase.from('items').select().textSearch('name', query);
    const { data } = await supabase.from('items').select().ilike('name', `%${query}%`)
    return data;
}