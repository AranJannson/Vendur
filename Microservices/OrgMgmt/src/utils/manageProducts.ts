import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

// CRUD operations for products
// Add a product listing
export async function addProduct(product :  {name: string, image: string, price: number, description: string, category: string, discount: number, org_id: string}) {
    const { data, error } = await supabase
        .from('products')
        .insert(product);

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}

// Modify a product listing