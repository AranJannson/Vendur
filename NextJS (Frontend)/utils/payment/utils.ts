interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

export async function postItem(item: any, quantity: Number, oldSize: String | null, newSize: String | null, action: String){
   const response = await fetch("/api/setCookies", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
          name: "basket",
          value: {
              id: item.id, 
              name:item.name,
              price: item.discount === null || item.discount === 0 ? ( item.price ) : ((item.price * (1 - item.discount / 100))),
              image: item.image,
              quantity: quantity,
              size: oldSize,
              newSize: newSize,
          },
          action: action,
      }),
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

export const fetchBasket = async (): Promise<Item[]> => {
  try {
    const response = await fetch("/api/getBasket", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch basket");
    }

    const data: Item[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching basket:", error);
    return [];
  }
};