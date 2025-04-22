export const originalStock = new Map<number, number>();

export function setOriginalStock(item_id: number, quantity: number) {
    if (!originalStock.has(item_id)) {
        originalStock.set(item_id, quantity);
      }
}

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

export async function revertStock(item: any){
    
    const item_id = item.id as number;
  
    const quantityResponse = await fetch('http://localhost:8000/modifyStockQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ item_id: item_id, quantity: originalStock.get(item_id) }),
      });

    return quantityResponse.json();
}

export async function modifyStock(item: any, quantity: number){
    
    const item_id = item.id;

    const stockResponse = await fetch('http://localhost:8000/getStock', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ item_id: item_id}),
      });
  
    const stockData = await stockResponse.json();
  
    const newQuantity = stockData.quantity + quantity;
  
    const quantityResponse = await fetch('http://localhost:8000/modifyStockQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ item_id: item_id, quantity: newQuantity }),
      });

    return quantityResponse.json();
}