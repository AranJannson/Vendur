import { connect } from "./dbConnect";

const supabase = connect();

// Ban Org
export const banOrg = async (id: any) => {
    const { data, error } = await supabase.from("orgs").update({ active: false }).eq("id", id).select();

    if (error) {
        throw new Error(`Error banning org: ${error.message}`);
    }
    return data;
}

// Unban Org
export const unbanOrg = async (id: any) => {
    const { data, error } = await supabase.from("orgs").update({ active: true }).eq("id", id).select();

    if (error) {
        throw new Error(`Error banning org: ${error.message}`);
    }
    return data;
}

// Un-Verify Org
export const unverifyOrg = async (id: any) => {
    const { data, error } = await supabase.from("orgs").update({ is_verified: false }).eq("id", id).select();

    if (error) {
        throw new Error(`Error banning org: ${error.message}`);
    }
    return data;
}
