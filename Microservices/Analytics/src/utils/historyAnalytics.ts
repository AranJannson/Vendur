import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

export interface BrowsingEvent {
    session_id: string;
    item_id: string;
    viewed_at?: string;
    user_id?: string;
}

export async function recordView(event: BrowsingEvent) {
    const { session_id, user_id } = event;

    if (user_id) {
        const { error: sessionError } = await catalogSupabase
            .from("sessions")
            .upsert([
                { session_id, user_id }
            ], { onConflict: "session_id" });

        if (sessionError) {
            console.error("Error upserting session:", sessionError);
        }
    }

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

// Recommended Products
export async function updateRecommendedProducts(user_id: string) {
    const DECAY_RATE = 0.1;

    const { data: sessions } = await catalogSupabase
        .from("sessions")
        .select("session_id")
        .eq("user_id", user_id);

    const sessionIds = sessions?.map((s) => s.session_id) ?? [];

    if (sessionIds.length === 0) return;

    const { data: views } = await catalogSupabase
        .from("browsing_history")
        .select("item_id, viewed_at")
        .in("session_id", sessionIds);

    const weights: Record<number, number> = {};
    const now = new Date();

    views?.forEach(({ item_id, viewed_at }) => {
        const viewedTime = new Date(viewed_at);
        const deltaDays = (now.getTime() - viewedTime.getTime()) / (1000 * 60 * 60 * 24);
        const decayWeight = Math.exp(-DECAY_RATE * deltaDays);
        weights[item_id] = (weights[item_id] || 1) + decayWeight;
    });

    const upserts = Object.entries(weights).map(([item_id, score]) => ({
        user_id,
        item_id: parseInt(item_id),
        score,
        recommended_at: new Date().toISOString()
    }));

    if (upserts.length > 0) {
        const { error } = await catalogSupabase
            .from("recommended_products")
            .upsert(upserts, { onConflict: "user_id, item_id" });

        if (error) {
            console.error("Failed to upsert recommended products:", error);
        }
    }
}

export async function getRecommendedProducts(user_id: string, limit = 10) {
    const { data, error } = await catalogSupabase
        .from("recommended_products")
        .select("item_id")
        .eq("user_id", user_id)
        .order("score", { ascending: false })
        .limit(limit);

    if (error || !data) return [];

    const itemIds = data.map((row) => row.item_id);

    const { data: items } = await catalogSupabase
        .from("items")
        .select("*")
        .in("id", itemIds);

    return items;
}
