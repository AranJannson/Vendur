interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

export async function postItem(user_id: string, dateTime: string, item_id: string) {
   const response = await fetch("http://localhost:8002/addToNewBasket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, dateTime, item_id }),
   });

  if (!response.ok) {
      throw new Error();
  }

  return response.json();
}

export async function deleteItem (item: any) {
  await fetch("http://localhost:8002/deletevalue", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id: item.id, size: item.size }),
  });
}

export const fetchBasket = async (user_id: string): Promise<Item[]> => {
  const res = await fetch("/api/getBasketNew", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id }),
  });
  if (!res.ok) throw new Error("Failed to fetch basket");
  return (await res.json()) as Item[];  // TS-cast to Item[]
};
