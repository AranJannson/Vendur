import { connect } from "./dbConnect";

const supabase = connect();

export async function getAllOrgs() {
    const { data, error } = await supabase.from('orgs').select('*');
    if (error) {
        return { error: error.message, data: null};
        }
    return data;
}


export async function createOrg(org_id: string, name: string, description: string, email: string, telephone: string, address: string){


    const { data, error } = await supabase.from('orgs').insert([{ id: org_id, name: name, description: description, email: email, telephone: telephone, address: address }]);

    if (error) {
        return { error: error.message, data: null};
    }

    return data;
}