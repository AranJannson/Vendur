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

/*
item_id = { item_id: number }
 */
interface ItemID {
    item_id: number;
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  });

  if (!res.ok) {
    console.error("[ContinueBrowsing] Failed to fetch continued viewing items. Status:", res.status);
    return null;
  }

  let item_ids: number[] = await res.json();
  console.log("[ContinueBrowsing] Raw item_ids response:", item_ids);

  // item_ids = item_ids.filter((id): id is number => typeof id === "number");
  // console.log("[ContinueBrowsing] Filtered item_ids:", item_ids);

  const itemFetches = await Promise.all(

    item_ids.map(async (item_id) => {
      //@ts-ignore
      console.log(`[ContinueBrowsing] Fetching item details for ID: ${item_id.item_id}`);
      const res = await fetch("http://localhost:3000/api/getItemByID", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item_id.item_id }),
      });

      if (!res.ok) {
        console.error(`[ContinueBrowsing] Failed to fetch item ${item_id}. Status:`, res.status);
        return null;
      }

      const item = await res.json();
      console.log(`[ContinueBrowsing] Fetched item:`, item);
      return item;
    })
  );

  const items: Item[] = itemFetches.filter((item): item is Item => item !== null);
  console.log("[ContinueBrowsing] Final items array:", items);

  if (!items || items.length === 0) {
    console.warn("[ContinueBrowsing] No items to display.");
    return null;
  }

  return (
    <div className="bg-background-50 m-4 rounded-lg max-w-screen">
      <div className="grid md:grid-cols-1 grid-cols-1 gap-8 p-4">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-8 grid-rows-1 gap-4 bg-secondary-200 p-5 rounded-xl border-2 border-black">
            <h2 className="text-4xl font-semibold h-full flex justify-center items-center col-span-2">
              Continue Browsing
            </h2>
            {items.slice(0, 6).map((item, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl bg-secondary-100 p-2 flex justify-center items-center"
              >
                <Link href={`/products/${item.name}`}>
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
