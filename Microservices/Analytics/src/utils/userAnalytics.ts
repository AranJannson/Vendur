import { createClient } from "@supabase/supabase-js";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Returns a list of user ids and how many orders they have made
export async function userOrderList(){
  const {data, error} = await catalogSupabase
      .from("orders")
      .select("user_id")

  if (error){
      console.log("Error fetching from orders:", error)
      return 0;
  }

  const userCount: Record<number, number> = {};

  data.forEach((item) => {
      const userId = item.user_id;
      if (userId){
          userCount[userId] = (userCount[userId] || 0) + 1;
      }
  })

  return userCount;
}

// Returns a list of user ids and the average order value for each
export async function userAvgOrderList(){
    const {data, error} = await catalogSupabase
        .from("orders")
        .select("user_id, price")

    if (error){
        console.log("Error fetching from orders:", error)
        return 0;
    }

    const userCount: Record<number, {total:0, count:0}> = {};

    data.forEach((item) => {
        const userId = item.user_id;
        const price = item.price;
        if (!userCount[userId]) {
           userCount[userId] = {total:0, count:0}
        }
        userCount[userId].total += price;
        userCount[userId].count ++;
    })

    const avgOrderPerUser: Record<number, number> = {};
    let userAvg: 0;

    for (const userId in userCount) {
        const{total, count} = userCount[userId];
        userAvg = total / count;
        avgOrderPerUser[userId] = (avgOrderPerUser[userId] || 0) + userAvg;
    }

    return avgOrderPerUser;
}