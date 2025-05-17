import Link from "next/link";
import { cookies } from "next/headers";

interface Item {
  id: number;
  name: string;
  image: string;
  category: string;
  discount: number;
  rating?: number;
  price: number;
}

export default async function ContinueBrowsing() {
  const cookieStore = await cookies();
  const sessionID = cookieStore.get("session_id")?.value;

  if (!sessionID) return null;

  const res = await fetch("http://localhost:3000/api/getContinueViewing", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session_id: sessionID }),
  });

  if (!res.ok) {
    console.error("Failed to fetch continued viewing items");
    return null;
  }

  let item_ids = await res.json();
  item_ids = item_ids.map((item: { item_id: number }) => item.item_id);

  const itemFetches = await Promise.all(
    item_ids.map(async (item_id: number) => {
      const res = await fetch("http://localhost:3000/api/getItemByID", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item_id }),
      });

      if (!res.ok) {
        console.error("Failed to fetch item", item_id);
        return null;
      }

      return res.json();
    })
  );

  const items: Item[] = itemFetches.filter((item): item is Item => item !== null);

  if (!items || items.length === 0) return null;

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
