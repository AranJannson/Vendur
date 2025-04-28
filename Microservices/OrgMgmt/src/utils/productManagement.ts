import { connectCatalogue } from "./dbConnect";
import { connect } from "./dbConnect";

const cat_supabase = connectCatalogue();
const org_supabase = connect();

export const getOrgInfo = async (org_id: any) => {
    const { data, error } = await org_supabase
        .from("orgs")
        .select()
        .eq("id", org_id)

    if (error) {
        throw new Error(`Error fetching org details: ${error.message}`);
    }
    return data;
}

// CRUD Operations for products
export const getProducts = async (org_id: any) => {
    const { data, error } = await cat_supabase
        .from("items")
        .select()
        .eq("org_id", org_id)

    if (error) {
        throw new Error(`Error fetching product: ${error.message}`);
    }
    return data;
}

export const createProduct = async (product: any) => {
    const { data, error } = await cat_supabase
        .from("items")
        .insert([product])

    if (error) {
        throw new Error(`Error creating product: ${error.message}`);
    }
    return data;
}

export const updateProduct = async (productId: any, product: any) => {
    const { data, error } = await cat_supabase
        .from("items")
        .update(product)
        .eq("id", productId)

    if (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
    return data;
}

export const deleteProduct = async (productId: any) => {
    const { data, error } = await cat_supabase
        .from("items")
        .delete()
        .eq("id", productId)

    if (error) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
    return data;
}

// Applying Discounts to Products
// If want to remove discount, pass null as discount value
export const applyDiscount = async (productId: any, discount: any) => {
    if (discount < 0 || discount > 100) {
        throw new Error("Discount must be between 0 and 100");
    }

    const { data, error } = await cat_supabase
        .from("items")
        .update({ discount })
        .eq("id", productId)
        .single()

    if (error) {
        throw new Error(`Error applying discount: ${error.message}`);
    }
    return data;
}
