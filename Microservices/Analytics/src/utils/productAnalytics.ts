import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);



// export async function popularProductOld() {
//     try {
//         // Fetch count of item_id occurrences
//         const { count} = await supabase
//             .from("orders")
//             .select("item_id")


//         const { data, error } = await supabase
//             .from("orders")
//             .select("item_id") // Select only item_id
//             .count("item_id", { exact: true }) // Count occurrences properly
//             .order("count", { ascending: false }) // Sort by highest count
//             .limit(1); // Get only the most popular product

//         if (error) throw error;
//         if (!data || data.length === 0) return "No orders found.";

//         return data[0]; // Return the most popular product

//     } catch (error) {
//         console.error("Error fetching most popular product:", error);
//         return null;
//     }
// }

export async function popularProduct(){

    try{
        // const { data, error } = await supabase.from("orders").select("item_id", {count:'exact'}).order("item_id");
        const { data, error } = await supabase.from("orders").select("*");
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }
}

export async function everydatabase(){

    try{
        const { data, error } = await supabase.from("orders").select("*");
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }


}




export async function testAllProducts(){

    try{
        const { data, error } = await supabase.from("orders").select("*");
        return data;

    }catch (error){
        console.error(error);
        return 0;
    }


}