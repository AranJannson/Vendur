'use client';

import { modifyStock } from "@/utils/catalogue/utils";
import { deleteItem } from "@/utils/payment/utils";

export default function DeleteItemButton({ user_id, item_id, refreshBasket }: {user_id: string, item_id: number, refreshBasket: any}) {
    const handleDelete = async () => {
  
      try {
        const[itemResponse, stockResponse] = await Promise.all([deleteItem(user_id, item_id), modifyStock(item_id, 1)]);
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally{
        await refreshBasket();
      }
    };
  
    return <div>
        <button type="submit"
            className="bg-primary-300 p-4 rounded-lg transition-colors hover:bg-primary-200 px-8 mt-4"
            onClick={handleDelete}
            >
                    Remove this item
        </button>
    </div>;
  }