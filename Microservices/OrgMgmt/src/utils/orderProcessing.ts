import { connectPayment, connectCatalogue } from "./dbConnect";

export async function getOrderById(orderId: string, org_id: string) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("org_id", org_id)
    .single();

  if (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }

  return data;
}

