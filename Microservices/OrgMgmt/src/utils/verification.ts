import { connectCatalogue } from "./dbConnect";

const supabase = connectCatalogue();

export const requestVerification = async (org_id: any) => {
    const { data, error } = await supabase
        .from("verification_requests")
        .insert([{ org_id }]);

    if (error) {
        throw new Error(`Error requesting verification: ${error.message}`);
    }
    return data;
}
