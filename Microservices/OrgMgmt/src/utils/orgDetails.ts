import { connect } from "./dbConnect";

const supabase = connect();

export async function getAllOrgs() {
    const { data, error } = await supabase.from('orgs').select('*');
    if (error) {
        return { error: error.message, data: null};
        }
    return data;
}