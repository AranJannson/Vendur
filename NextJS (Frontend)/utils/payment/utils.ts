export async function postItem(item: any, quantity: Number, size: String | null){
    const response = await fetch("http://localhost:8002/setcookie", {
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
                size: size,
            }
        }),
    });   
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