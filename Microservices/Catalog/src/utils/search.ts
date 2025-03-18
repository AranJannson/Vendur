import { connect } from "./dbConnect";

export default async function searchCatalogue(query: string, filters: string[] = []) {
    const supabase = connect();

    if (filters.length === 0 || null || undefined || "") {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`)
        return data;
    }

    // URL template = /search?query=apple&filters=category_fruit,sort_price
    // http://localhost:3000/search?query=l&filters=category_Electronics%20%26%20Computing

    const categoryFilter = filters.find(filter => filter.startsWith("category_"));
    if (categoryFilter) {
        // const categoryValue = categoryFilter.split("_")[1];
        console.log(`Category Filter: ${categoryFilter}`)
        const categoryValue = decodeURIComponent(categoryFilter.replace("category_", ""));

        console.log(`Category Value: ${categoryValue}\nQuery: ${query}`)

        if (categoryValue === null) {
            const { data } = await supabase
                .from('items')
                .select()
                .ilike('name', `%${query}%`);
            return data;
        }
        const { data } = await supabase
            .from('items')
            .select()
            .ilike('name', `%${query}%`)
            .eq("category", categoryValue);
        return data;
    }
    // http://localhost:3000/search?query=apple&filters=price_min_100,price_max_200
    // Search by Price Range
    const priceMinFilter = filters.find(filter => filter.startsWith("price_min_"));
    const priceMaxFilter = filters.find(filter => filter.startsWith("price_max_"));

    if (priceMinFilter && priceMaxFilter) {
        const minPrice = parseInt(priceMinFilter.split("_")[2]);
        const maxPrice = parseInt(priceMaxFilter.split("_")[2]);
        const {data} = await supabase.from('items').select().ilike('name', `%${query}%`).gte("price", minPrice).lte("price", maxPrice);
        return data;
    }

    // Sort by Price (Ascending)
    // http://localhost:3000/search?query=apple&filters=sort_price_ASC
    const sortPriceAscFilter = filters.find(filter => filter.startsWith("sort_price_ASC"));
    if (sortPriceAscFilter) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("price", { ascending: true });
        return data;
    }
    // Sort by Price (Descending)
    // http://localhost:3000/search?query=apple&filters=sort_price_DESC
    const sortPriceDescFilter = filters.find(filter => filter.startsWith("sort_price_DESC"));
    if (sortPriceDescFilter) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("price", { ascending: false });
        return data;
    }
    // Sort by Name (Ascending)
    const sortNameAscFilter = filters.find(filter => filter.startsWith("sort_name_ASC"));
    if (sortNameAscFilter) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("name", { ascending: true });
        return data;
    }
    // Sort by Name (Descending)
    const sortNameDescFilter = filters.find(filter => filter.startsWith("sort_name_DESC"));
    if (sortNameDescFilter) {
        const { data } = await supabase.from('items').select().ilike('name', `%${query}%`).order("name", { ascending: false });
        return data;
    }
}
