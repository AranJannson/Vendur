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

//Get Order Item Status
export async function getOrderStatusByOrderId(id: number) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("orders")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching order status [getOrderStatusByItemId]: ${error.message}`);
  }
  //console.log("Response:", data);
  return data;
}

//Update Order Item Status
export async function updateOrderStatusByOrderId(id: number, status: string) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("orders")
    .update({ status: status })
    .eq("id", id)
    .select("group_id")
    .maybeSingle();

  if (error) {
    throw new Error(`Error updating order status: ${error.message}`);
  }

  return data;
}

export async function updateOrderGroupStatus(orderGroupId: number) {
  const supabase = connectPayment();

  // Fetch all item statuses for this order group
  const { data: groupItems, error } = await supabase
    .from("orders")
    .select("status")
    .eq("group_id", orderGroupId);

  if (error) {
    throw new Error(`Error fetching group items: ${error.message}`);
  }

  const statuses = groupItems?.map(item => item.status) ?? [];

  // Determine new group status
  let newGroupStatus = "Processing";

  if (statuses.length > 0) {
    if (statuses.every(s => s === "Confirmed")) {
      newGroupStatus = "Completed";
    } else if (statuses.every(s => s === "Cancelled")) {
      newGroupStatus = "Cancelled";
    }
  }

  // Update the order group status
  const { data, error: updateError } = await supabase
    .from("order_groups")
    .update({ status: newGroupStatus })
    .eq("id", orderGroupId)
    .maybeSingle();

  if (updateError) {
    throw new Error(`Error updating order group status: ${updateError.message}`);
  }

  return data;
}

//Get Group Order Item Status
export async function getGroupOrderStatusByOrderId(id: number) {
  const supabase = connectPayment();
  const { data, error } = await supabase
    .from("order_groups")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching order status [getGroupOrderStatusByOrderId]: ${error.message}`);
  }
  //console.log("Response:", data);
  return data;
}