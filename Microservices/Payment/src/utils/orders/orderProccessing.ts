import {createClient} from "@supabase/supabase-js";

type Item = {
    id: string;
    quantity: number;
};

export default async function orderProcessing(basket: Item[], user_id: string) {

    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    const groupId = supabase.from("group_orders").insert(user_id).select("id").single();


    for (const item of basket) {
        const { data, error } = await supabase.from("orders").insert([item.id, item.quantity, groupId, "pending"]);

        if (error) {
            console.error("Error inserting order:", error);
            return 0;
        }
    }

    return 1;

}

export async function getOrderDetails(order_group_id: string) {
    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase.from("orders").select("*").eq("order_group_id", order_group_id);

        if (error) {
            console.error("Error fetching order details:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        return null;
    }
}

export async function changeStatus(order_group_id: string, status: string) {
    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase.from("orders").update("status", status).eq("order_group_id", order_group_id);

        if (error) {
            console.error("Error updating order status:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error updating order status:", error);
        return null;
    }
}

export async function changeStatusIndividual(order_id: string, status: string) {
    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase.from("orders").update("status", status ).eq("id", order_id);

        if (error) {
            console.error("Error updating order status:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error updating order status:", error);
        return null;
    }
}

export async function cancelOrder(order_group_id: string){

    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase.from("orders").update({ status: "cancelled" }).eq("order_group_id", order_group_id);

        if (error) {
            console.error("Error canceling order:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error canceling order:", error);
        return null;
    }

}


