import { modifyStock } from "./AddToCheckoutButton";

async function deleteItem (item: any) {
  await fetch("http://localhost:8002/deletevalue", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id: item.id, size: item.size }),
  });
}

export default function DeleteItemButton({ item, refreshBasket }: {item: any, refreshBasket: any}) {
    const handleDelete = async () => {
  
      try {
        const[itemResponse, stockResponse] = await Promise.all([deleteItem(item), modifyStock(item, +item.quantity)]);
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally{
        refreshBasket(); 
      }

    };
  
    return <div>
        <button type="submit"
            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
            onClick={handleDelete}
            >
                    Remove this item
        </button>
    </div>;
  }
  