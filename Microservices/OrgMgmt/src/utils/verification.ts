import { connectCatalogue } from "./dbConnect";

const supabase = connectCatalogue();

export const requestVerification = async (org_id: number, name: string, email: string, description: string, productInfo: string, shippingMethod: string) => {
    const { data, error } = await supabase
        .from("verification_requests")
        .insert([
            {
                org_id,
                name,
                email,
                description,
                productInfo,
                shippingMethod
            }
        ]);

    if (error) {
        throw new Error(`Error requesting verification: ${error.message}`);
    }
    return data;
}
