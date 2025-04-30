import { connectPayment } from "./dbConnect";

export async function getOrderById(orderId: string) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }

  return data;
}

// TODO: Get Order Group by ID

// TODO: Change status of order e.g. "pending" to "completed"

// TODO: Delete/cancel an order