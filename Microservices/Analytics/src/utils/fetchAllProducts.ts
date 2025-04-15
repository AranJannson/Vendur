import { createClient } from "@supabase/supabase-js";

// Create a client for the catalogue database using its unique URL and anonymous key.
// This client is used to interact with the database that stores product information.
const catalougeSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

// Create a separate client for the analytics database using its unique URL and anonymous key.
// This client is used to interact with the database that stores analytics-related data.
const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Function to fetch all products from the catalogue database.
export async function fetchAllProducts() {
    // Query the 'items' table from the catalogue database.
    const { data } = await catalougeSupabase.from("stock").select("*");
    return data;
}
