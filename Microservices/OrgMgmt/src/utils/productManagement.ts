import { connectCatalogue } from "./dbConnect";

const supabase = connectCatalogue();

export const getOrgProducts = async (org_id: any) => {
    const { data, error } = await supabase
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