export function setOriginalStock(item_id: number, quantity: number) {
  sessionStorage.setItem(`originalStock-${item_id}`, String(quantity));
}

export function getOriginalStock(item_id: number): number | null {
  const stored = sessionStorage.getItem(`originalStock-${item_id}`);
  return stored ? Number(stored) : null;
}

export async function revertStock(item: any){
    
    const item_id = item.id as number;
    const originalQuantity = getOriginalStock(item_id)

    const quantityResponse = await fetch('/api/revertStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ item_id: item_id, quantity: originalQuantity}),
      });

    return quantityResponse.json();
}

export async function modifyStock(item: any, quantity: number){
    
    const item_id = item.id;

    const stockResponse = await fetch('/api/getStock', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ item_id: item_id}),
      });
  
    const stockData = await stockResponse.json();
  
    const newQuantity = stockData.quantity + quantity;
  
    const quantityResponse = await fetch('/api/updateStockQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ item_id: item_id, quantity: newQuantity }),
      });

    return quantityResponse.json();
}