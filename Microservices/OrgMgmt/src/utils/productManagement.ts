import { connectCatalogue } from "./dbConnect";
import { connect } from "./dbConnect";

const cat_supabase = connectCatalogue();
const org_supabase = connect();

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

export async function getOrgByName(name: string) {
    const { data, error } = await org_supabase
        .from("orgs")
        .select("*")
        .eq("name", name).single();
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
    .select("id");

  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }

  const newProductId = (data as { id: number }[] | null)?.[0]?.id;

  if (!newProductId) {
    throw new Error("Failed to retrieve new product ID");
  }

  const { error: stockError } = await cat_supabase
    .from("stock")
    .insert([{ item_id: newProductId, quantity: 0 }]);

  if (stockError) {
    throw new Error(`Error creating stock record: ${stockError.message}`);
  }

  return data;
};

export const updateProduct = async (productId: any, product: any) => {
    const { stock, ...productData } = product;
    const { data, error } = await cat_supabase
        .from("items")
        .update(productData)
        .eq("id", productId)

    if (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }

  if (typeof stock !== "undefined") {
    const { data: stockData, error: stockError } = await cat_supabase
      .from("stock")
      .update({ quantity: stock })
      .eq("item_id", productId);

    if (stockError) {
      throw new Error(`Error updating stock: ${stockError.message}`);
    }
  }

  return data;
};

export const deleteProduct = async (productId: number, org_id: string) => {
  const { data, error } = await cat_supabase
    .from("items")
    .delete()
    .eq("id", productId)
    .select("*");

  if (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }

  const deleted = data as { org_id: string }[];

  if (!deleted || deleted.length === 0) {
    throw new Error("No product found to delete.");
  }

  if (deleted[0].org_id !== org_id) {
    throw new Error("You are not authorised to delete this product.");
  }

  return deleted;
};


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

    console.log("Discount applied:", data);
    console.log(`Discount value: ${discount}\nProduct ID: ${productId}`);

    if (error) {
        throw new Error(`Error applying discount: ${error.message}`);
    }
    return data;
}

export const getProductByID = async (id: any) => {
    const { data, error } = await cat_supabase
        .from("items")
        .select()
        .eq("id", id)

    if (error) {
        throw new Error(`Error fetching product: ${error.message}`);
    }
    return data;
}

// Get Stock by item ID
export const getItemStock = async (item_id: any) => {
    const { data, error } = await cat_supabase
        .from("stock")
        .select()
        .eq("item_id", item_id)

    if (error) {
        throw new Error(`Error fetching stock: ${error.message}`);
    }
    return data;
}

// Update Stock per item
export const updateItemStock = async (item_id: any, quantity: any) => {
    const { data, error } = await cat_supabase
        .from("stock")
        .update(quantity)
        .eq("item_id", item_id)

    if (error) {
        throw new Error(`Error updating stock: ${error.message}`);
    }
    return data;
}