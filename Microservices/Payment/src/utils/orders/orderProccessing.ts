import {createClient} from "@supabase/supabase-js";

type Item = {
    id: string;
    quantity: number;
};

export default async function orderProcessing(basket: Item[], user_id: string, delivery_address: string, full_name: string, total_cost: number) {
    const supabase = createClient(
        process.env.PUBLIC_SUPABASE_URL as string,
        process.env.PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data: group, error: groupError } = await supabase
        .from("order_groups")
        .insert({ user_id, delivery_address, full_name, total_cost })
        .select("id")
        .single();

    if (groupError || !group) {
        console.error("Error inserting group order:", groupError);
        return 0;
    }

    for (const item of basket) {
        const { error } = await supabase.from("orders").insert([{
            item_id: item.id,
            quantity: item.quantity,
            group_id: group.id,
        }]);

        if (error) {
            console.error("Error inserting order:", error);
            return null;
        }
    }

    return group.id;
}


export async function getAllUserOrders(user_id: string) {

    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase
            .from("order_groups")
            .select(`*,orders (*)`)
            .eq("user_id", user_id);

        if (error) {
            console.error("Error fetching orders:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return null;
    }
}


export async function getOrderDetails(order_group_id: string) {
    const supabase = createClient(process.env.PUBLIC_SUPABASE_URL as string, process.env.PUBLIC_SUPABASE_ANON_KEY as string);

    try {
        const { data, error } = await supabase.from("order_groups").select("*").eq("id", order_group_id).single();

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
        const { data, error } = await supabase.from("orders").update({ status }).eq("order_group_id", order_group_id);

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
        const { data, error } = await supabase.from("orders").update({ status }).eq("id", order_id);

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