import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

export interface BrowsingEvent {
    session_id: string;
    item_id: string;
    viewed_at?: string;
}

export async function recordView(event: BrowsingEvent) {
    const { data, error } = await catalogSupabase
        .from("browsing_history")
        .insert([event]);

    if (error) {
        console.error("Error recording view:", error);
    } else {
        console.log("View recorded:", data);
    }
    return data;
}

export async function getRecentViews(session_id: string, limit = 5): Promise<{ item_id: string }[]> {
    const { data, error } = await catalogSupabase
        .from('browsing_history')
        .select(' item_id')
        .eq('session_id', session_id)
        .order('viewed_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching recent views:", error);
        throw error;
    }
    return data as { item_id: string }[];
}