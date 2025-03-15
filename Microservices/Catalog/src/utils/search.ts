import { connect } from "./dbConnect";

export default async function searchCatalogue(query: string, filters: string[] = []) {
    const supabase = connect();

    if (filters.length === 0) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`)
        return data;
    }

    // URL template = /search?query=apple&filters=category_fruit,sort_price
    // http://localhost:3000/search?query=l&filters=category_Electronics%20%26%20Computing

    // Search by Category
    // const categoryFilter = filters.find(filter => filter.startsWith("category_"))
    // if (filters.includes("category")) {
    //
    //     const { data } = await supabase
    //         .from('items')
    //         .select()
    //         .ilike('name', `%${query}%`)
    //         .eq("category", filters[filters.indexOf("category") + 1]);
    //     return data;
    // }

    const categoryFilter = filters.find(filter => filter.startsWith("category_"));
    if (categoryFilter) {
        // const categoryValue = categoryFilter.split("_")[1];
        console.log(`Category Filter: ${categoryFilter}`)
        const categoryValue = decodeURIComponent(categoryFilter.replace("category_", ""));

        console.log(`Category Value: ${categoryValue}\nQuery: ${query}`)
        const { data } = await supabase
            .from('items')
            .select()
            .ilike('name', `%${query}%`)
            .eq("category", categoryValue);
        return data;
    }

    // Search by Price Range
    if (filters.includes("price")) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).gte("price", filters[filters.indexOf("price") + 1]).lte("price", filters[filters.indexOf("price") + 2]);
        return data;
    }

    // Sort by Price (Ascending)
    if (filters.includes("sort")) {
        if (filters[filters.indexOf("sort") + 1] === "price") {
            const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("price", { ascending: true });
            return data;
        }
    }
    // Sort by Price (Descending)
    if (filters.includes("sort")) {
        if (filters[filters.indexOf("sort") + 1] === "price") {
            const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("price", { ascending: false });
            return data;
        }
    }
    // Sort by Name (Ascending)
    if (filters.includes("sort")) {
        if (filters[filters.indexOf("sort") + 1] === "name") {
            const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("name", { ascending: true });
            return data;
        }
    }
    // Sort by Name (Descending)
    if (filters.includes("sort")) {
        if (filters[filters.indexOf("sort") + 1] === "name") {
            const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("name", { ascending: false });
            return data;
        }
    }
}

export async function searchByCategory(query: string, category: string){

    const supabase = connect();

    const { data } = await supabase.from("items").select().eq("category", category).ilike("name", `%${query}%`)

    return data;

}

