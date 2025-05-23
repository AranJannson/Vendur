import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

export interface BrowsingEvent {
  user_id: string;
  item_id: number;
  viewed_at?: string;
}

export async function recordView(event: BrowsingEvent) {
  const { user_id, item_id, viewed_at } = event;
  const MAX_HISTORY_LENGTH = 5;

  if (!user_id || !item_id) {
    console.error("Missing user_id or item_id");
    return;
  }

  const viewTime = viewed_at ?? new Date().toISOString();

  const { data: existing, error: readError } = await catalogSupabase
    .from("browsing_history")
    .select("item_ids, viewed_at")
    .eq("user_id", user_id)
    .maybeSingle();

  if (readError) {
    console.error("Error reading browsing history:", readError);
    return;
  }

  let updatedItemIds = existing?.item_ids || [];
  let updatedViewedAt = existing?.viewed_at || [];

  // Deduplicate: remove existing entry if item already viewed
  const index = updatedItemIds.findIndex((id: number) => id === item_id);
  if (index !== -1) {
    updatedItemIds.splice(index, 1);
    updatedViewedAt.splice(index, 1);
  }

  // Append new entry to the end
  updatedItemIds.push(item_id);
  updatedViewedAt.push(viewTime);

  // Enforce queue limit (keep only most recent N items)
  if (updatedItemIds.length > MAX_HISTORY_LENGTH) {
    updatedItemIds = updatedItemIds.slice(-MAX_HISTORY_LENGTH);
    updatedViewedAt = updatedViewedAt.slice(-MAX_HISTORY_LENGTH);
  }

  const { data, error: writeError } = await catalogSupabase
    .from("browsing_history")
    .upsert(
      [
        {
          user_id,
          item_ids: updatedItemIds,
          viewed_at: updatedViewedAt,
        },
      ],
      { onConflict: "user_id" }
    );

  if (writeError) {
    console.error("Error updating browsing history:", writeError);
  } else {
    console.log("Browsing history updated for user (deduplicated + queued)");
  }

  return data;
}




type View = {
    item_id: number;
    viewed_at: string;
}

export async function getRecentViews(user_id: string, limit = 5): Promise<{ item_id: number }[]> {
  const { data, error } = await catalogSupabase
    .from("browsing_history")
    .select("item_ids, viewed_at")
    .eq("user_id", user_id)
    .maybeSingle();

  if (error || !data) {
    console.error("Error fetching recent views:", error?.message || "No data found");
    return [];
  }

  const { item_ids, viewed_at } = data;

  if (
    !Array.isArray(item_ids) ||
    !Array.isArray(viewed_at) ||
    item_ids.length !== viewed_at.length
  ) {
    console.warn("Invalid or mismatched browsing history arrays");
    return [];
  }

  type View = { item_id: number; viewed_at: string };

  const zipped: View[] = item_ids.map((id: number, i: number): View => ({
    item_id: id,
    viewed_at: viewed_at[i],
  }));

  const sorted = zipped.sort(
    (a: View, b: View) =>
      new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime()
  );

  return sorted.slice(0, limit).map(({ item_id }) => ({ item_id }));
}

// Recommended Products
export async function updateRecommendedProducts(user_id: string) {
  const DECAY_RATE = 0.1;

  const { data: views } = await catalogSupabase
    .from("browsing_history")
    .select("item_id, viewed_at")
    .eq("user_id", user_id);

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
    recommended_at: new Date().toISOString(),
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
