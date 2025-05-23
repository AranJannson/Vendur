import Link from "next/link";

interface Item {
  id: number;
  name: string;
  image: string;
  category: string;
  discount: number;
  rating?: number;
  price: number;
}

export default async function ContinueBrowsing({ user_id }: { user_id: string }) {
  console.log("[ContinueBrowsing] Component loaded with user_id:", user_id);

  if (!user_id) {
    console.warn("[ContinueBrowsing] No user_id provided.");
    return null;
  }

  const res = await fetch("http://localhost:3000/api/getContinueViewing", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id }),
  });

  if (!res.ok) {
    console.error("[ContinueBrowsing] Failed to fetch continued viewing items. Status:", res.status);
    return null;
  }

  const raw: { item_id: number }[] = await res.json();
  console.log("[ContinueBrowsing] Raw response entries:", raw);

  const item_ids: number[] = raw.map(entry => entry.item_id);
  console.log("[ContinueBrowsing] Flattened item_ids:", item_ids);

  // 3) Now map over real numbers:
  const itemFetches = await Promise.all(
    item_ids.map(async (item_id: number) => {
      console.log(`[ContinueBrowsing] Fetching item details for ID: ${item_id}`);
      const r = await fetch("http://localhost:3000/api/getItemByID", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item_id }),
      });
      if (!r.ok) {
        console.error(`[ContinueBrowsing] Failed to fetch item ${item_id}. Status:`, r.status);
        return null;
      }
      const item = await r.json();
      console.log(`[ContinueBrowsing] Fetched item:`, item);
      return item as Item;
    })
  );

  const items: Item[] = itemFetches.filter((i): i is Item => i !== null);
  console.log("[ContinueBrowsing] Final items array:", items);

  if (items.length === 0) {
    console.warn("[ContinueBrowsing] No items to display.");
    return null;
  }

  return (
    <div className="bg-background-50 m-4 rounded-lg max-w-screen">
      <div className="grid md:grid-cols-1 grid-cols-1 gap-8 p-4">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-8 gap-4 bg-secondary-200 p-5 rounded-xl border-2 border-black">
            <h2 className="text-4xl font-semibold col-span-2 flex justify-center items-center">
              Continue Browsing
            </h2>
            {items.slice(0, 6).map((item, idx) => (
              <div
                key={idx}
                className="relative group aspect-square rounded-xl bg-secondary-100 p-2 flex justify-center items-center"
              >
                <Link href={`/products/${encodeURIComponent(item.name)}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="150"
                    height="150"
                    className="object-contain aspect-square"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
