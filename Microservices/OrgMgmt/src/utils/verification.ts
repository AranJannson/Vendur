import { connect } from "./dbConnect";

const supabase = connect();

export const requestVerification = async (org_id: string, name: string, email: string, description: string, 
    productInfo: string, shippingMethod: string, image_document: string, image_thumbnail: string) => {
    const { data, error } = await supabase
        .from("verification_requests")
        .insert([
            {
                org_id,
                name,
                email,
                description,
                productInfo,
                shippingMethod,
                image_document,
                image_thumbnail
            }
        ]);

    if (error) {
        throw new Error(`Error requesting verification: ${error.message}`);
    }
    return data;
}

export async function getAllVerifiedOrgs() {
    return await supabase
        .from("orgs")
        .select("*")
        .eq("is_verified", true);
}
