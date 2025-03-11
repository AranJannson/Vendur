import { connect } from "./dbConnect";

export default async function searchCatalogue(query: string, filters: string[string] | undefined = undefined) {
    const supabase = connect();

    if (!filters) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`)
        return data;
    }


    // Search by Category
    if (filters.includes("category")) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).eq("category", filters[filters.indexOf("category") + 1]);
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

    const { data } = await supabase.from("items").select().eq("category", category).ilike("name", `%${query}%`).;

    return data;

}

