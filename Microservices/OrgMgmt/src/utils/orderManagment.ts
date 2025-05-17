import { connectPayment } from "./dbConnect";

// TODO: Get All Orders for a specific org
export async function getAllOrders(org_id: string) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("org_id", org_id);

  if (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }

  return data;
}

// TODO: Get Order Group by ID
export async function getOrdersByItemId(item_id: number) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("item_id", item_id)

  if (error) {
    throw new Error(`Error fetching order [getOrderByItemId]: ${error.message}`);
  }

  return data;
}

export async function getOrderGroupById(id: number) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("order_groups")
    .select("*")
    .eq("id", id)

  if (error) {
    throw new Error(`Error fetching order [getOrderGroupById]: ${error.message}`);
  }

  return data;
}

// TODO: Change status of order e.g. "pending" to "completed"
export async function updateOrderStatus(orderId: string, status: string) {
    const supabase = connectPayment();
    const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

    if (error) {
        throw new Error(`Error updating order status: ${error.message}`);
    }

    return data;
}

// TODO: Delete/cancel an order
export async function deleteOrder(orderId: string) {
    const supabase = connectPayment();
    const { data, error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

    if (error) {
        throw new Error(`Error deleting order: ${error.message}`);
    }

    return data;
}