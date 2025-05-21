import { createClient } from "@supabase/supabase-js";

export default async function addToBasket(user_id: string, dateTime: Date, item_id: number) {
    const supabase = createClient(
        process.env.PUBLIC_SUPABASE_URL as string,
        process.env.PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data: UserBasket, error: fetchError } = await supabase
        .from("basket")
        .select("user_id, items, quantities")
        .eq("user_id", user_id)
        .single();


    if (!UserBasket) {
        const { data: newBasket, error: createError } = await supabase
            .from("basket")
            .insert({
                user_id,
                created_at: new Date(),
                items: [item_id],
                quantities: [1],
            })
            .single();

        if (createError) {
            console.error("Error creating basket:", createError);
            return null;
        }

        return newBasket;
    }

    if (UserBasket) {
        const index = UserBasket.items.indexOf(item_id);

        if (index !== -1) {
            const updatedQuantity = [...UserBasket.quantities];
            updatedQuantity[index] += 1;

            const { error: updateError } = await supabase
                .from("basket")
                .update({ quantities: updatedQuantity })
                .eq("user_id", UserBasket.user_id);

            if (updateError) {
                console.error("Error updating quantity:", updateError);
                return null;
            }

            return UserBasket;
        } else {
            const updatedItems = [...UserBasket.items, item_id];
            const updatedQuantity = [...UserBasket.quantities, 1];

            const { error: updateError } = await supabase
                .from("basket")
                .update({ items: updatedItems, quantities: updatedQuantity })
                .eq("user_id", UserBasket.user_id);

            if (updateError) {
                console.error("Error appending item to basket:", updateError);
                return null;
            }

            return UserBasket;
        }
    } else {
        const { data: newBasket, error: insertError } = await supabase
            .from("basket")
            .insert({
                user_id,
                dateTime,
                items: [item_id],
                quantities: [1],
            })
            .select("user_id")
            .single();

        if (insertError) {
            console.error("Error inserting new basket:", insertError);
            return null;
        }

        return newBasket;
    }

    return null;
}


export async function decreaseQuantity(item_id: number, user_id: string) {

    const supabase = createClient(
        process.env.PUBLIC_SUPABASE_URL as string,
        process.env.PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data: UserBasket, error: fetchError } = await supabase
        .from("basket")
        .select("user_id, items, quantities")
        .eq("user_id", user_id)
        .single();

    if (fetchError) {
        console.error("Error fetching basket:", fetchError);
        return null;
    }

    if (UserBasket) {
        const index = UserBasket.items.indexOf(item_id);

        if (index !== -1) {
            const updatedItems = [...UserBasket.items];
            const updatedQuantities = [...UserBasket.quantities];
            updatedQuantities[index] -= 1;

            if (updatedQuantities[index] <= 0) {
                updatedItems.splice(index, 1);
                updatedQuantities.splice(index, 1);
            }

            const { error: updateError } = await supabase
                .from("basket")
                .update({ items: updatedItems, quantities: updatedQuantities })
                .eq("user_id", user_id);

            if (updateError) {
                console.error("Error updating quantity:", updateError);
                return null;
            }


            return UserBasket;
        }
    }

    return null;

}

export async function getBasket(user_id: string){

    const supabase = createClient(
        process.env.PUBLIC_SUPABASE_URL as string,
        process.env.PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data: UserBasket, error: fetchError } = await supabase
        .from("basket")
        .select("user_id, items, quantities")
        .eq("user_id", user_id)
        .single();

    if (fetchError) {
        console.error("Error fetching basket:", fetchError);
        return null;
    }

    return UserBasket;

}

export async function deleteBasket(user_id: string){
    const supabase = createClient(
        process.env.PUBLIC_SUPABASE_URL as string,
        process.env.PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data: UserBasket, error: fetchError } = await supabase
        .from("basket")
        .delete()
        .eq("user_id", user_id);

    if (fetchError) {
        console.error("Error deleting basket:", fetchError);
        return null;
    }

    return UserBasket;
}