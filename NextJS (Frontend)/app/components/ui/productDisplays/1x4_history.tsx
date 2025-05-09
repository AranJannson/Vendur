import Link from "next/link";
import { getSessionID } from "@/app/utils/session/utils";
import { cookies } from "next/headers";

interface Item {
  id: number;
  name: string;
  image: string;
  category: string;
  discount: number;
  rating: number;
  price: number;
}

export default async function ContinueBrowsing() {
  const cookieStore = await cookies();
  const sessionID = cookieStore.get("session_id")?.value;
  console.log(sessionID)

  if (!sessionID) return null;

  const res = await fetch(`http://localhost:3000/api/getContinueViewing`, {
    method: "POST",
    cache: "no-store",
      body: JSON.stringify({
        session_id: sessionID
      })
  });

  // if (!res.ok) {
  //   console.error("Failed to fetch browsing history");
  //   return null;
  // }

  const item_ids = await res.json();
  console.log(`Item IDs in 1x4_history: ${item_ids}`);

  const response = await fetch(`http://localhost:3000/api/getItemByID`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      id: 8
    })
  });

  const item_data = await response.json();
    console.log(`Item data in 1x4_history: ${JSON.stringify(item_data)}`);

  // const items = item_ids.map((item_id: number) => {
  //   const res = fetch(`http://localhost:3000/api/getItemByID`, {
  //     method: "POST",
  //     cache: "no-store",
  //     body: JSON.stringify({
  //       id: item_id
  //     })
  //   });
  //
  //   if (!res.ok) {
  //     console.error("Failed to fetch item");
  //     return null;
  //   }
  //
  //   return res.json();
  // });
  //
  //   console.log(`Items in 1x4_history: ${items}`);
  // if (!items || items.length === 0) return null;

  return (
    <div className="bg-background-50 m-4 rounded-lg max-w-screen">
      {/* TODO: Add function in catalog to find item by ID */}
      {/*<div className="bg-background-50 p-4 rounded-t-xl rounded-b-xl" />*/}

      {/*<div className="grid md:grid-cols-1 grid-cols-1 gap-8 p-4">*/}
      {/*  <Link href="/products" className="flex flex-col items-center">*/}
      {/*    <div className="grid grid-cols-8 grid-rows-1 gap-4 bg-secondary-200 p-5 rounded-xl border-2 border-black">*/}
      {/*      <h2 className="text-4xl font-semibold h-full flex justify-center items-center col-span-2">*/}
      {/*        Continue Browsing*/}
      {/*      </h2>*/}
      {/*      {items.slice(0, 8).map((item, index) => (*/}
      {/*        <div*/}
      {/*          key={index}*/}
      {/*          className="relative group aspect-square rounded-xl bg-secondary-100 p-2 flex justify-center items-center"*/}
      {/*        >*/}
      {/*          <img*/}
      {/*            src={item.image}*/}
      {/*            alt={item.name}*/}
      {/*            width="150"*/}
      {/*            height="150"*/}
      {/*            className="object-contain aspect-square"*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </div>
    );
}
