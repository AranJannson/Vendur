import { connectCatalogue } from "./dbConnect";

const supabase = connectCatalogue();

<<<<<<< Updated upstream
export const getOrgProducts = async (org_id: any) => {
    const { data, error } = await supabase
=======
export const getOrgInfo = async (id: any) => {
    const { data, error } = await org_supabase
        .from("orgs")
        .select()
        .eq("id", id)

    if (error) {
        throw new Error(`Error fetching org details: ${error.message}`);
    }
    return data;
}

// CRUD Operations for products
export const getProducts = async (org_id: any) => {
    const { data, error } = await cat_supabase
>>>>>>> Stashed changes
        .from("items")
        .select()
        .eq("org_id", org_id)

    if (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
    return data;
}

// CRUD Operations for products
export const createProduct = async (product: any) => {
    const { data, error } = await supabase
        .from("items")
        .insert([product])

    if (error) {
        throw new Error(`Error creating product: ${error.message}`);
    }
    return data;
}

export const updateProduct = async (productId: any, product: any) => {
    const { data, error } = await supabase
        .from("items")
        .update(product)
        .eq("id", productId)

    if (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
    return data;
}

export const deleteProduct = async (productId: any) => {
    const { data, error } = await supabase
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

    const { data, error } = await supabase
        .from("items")
        .update({ discount })
        .eq("id", productId)
        .single()

    if (error) {
        throw new Error(`Error applying discount: ${error.message}`);
    }
    return data;
}
