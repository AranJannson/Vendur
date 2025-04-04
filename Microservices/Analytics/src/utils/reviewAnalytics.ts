import {createClient} from "@supabase/supabase-js";
import { reduceEachTrailingCommentRange } from "typescript";

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

// Returns product with the most reviews
export async function mostReviewedProduct(){
    const { data, error } = await catalogSupabase
        .from("reviews")
        .select("id, item:items!id (id, name)");

    if (error){
        console.error("Error fetching items:", error);
        return 0;
    }

    let total = 0;
    const reviewCount: Record<number, number> = {};
    data.forEach((item) => {
        console.log(item.item);
        // Checks if item.item (price) is an array or object and acts accordingly
        const id = Array.isArray(item.item)
            ? (item.item as { id: number }[])[0]?.id
            : (item.item as { id: number }).id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[0]?.name
            : (item.item as { name: string }).name;
        if (id){
            reviewCount[id] = (reviewCount[id] || 0) + 1
        }
    })
    let mostReviewedItem: string | null = null;
    let maxCount = 0;
    for (const category in reviewCount) {
        if (reviewCount[category] > maxCount) {
            mostReviewedItem = category;
            maxCount = reviewCount[category];
        }
    }
    return mostReviewedItem ? { id : mostReviewedItem, count: maxCount } : null;
}

// List of products ranked from the highest average review to the lowest average review
export async function productsByReviewValue(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, rating, item:items!id (id, name)")

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }

    const ReviewCount: Record<number, { name: string; totalRating: number; count: number  }> = {};

    data.forEach((item) => {
        const id = Array.isArray(item.item)
            ? (item.item as { id: number }[])[0]?.id
            : (item.item as { id: number }).id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[1]?.name
            : (item.item as { name: string }).name;
        const rating = item.rating;

        const product = Array.isArray(item.item) ? item.item[0] : item.item;
        if (!item || !item.id) return;

        if (!ReviewCount[id]) {
            ReviewCount[id] = { name, totalRating: 0, count: 0 };
        }
        ReviewCount[id].totalRating += rating;
        ReviewCount[id].count += 1;
    })
    return Object.entries(ReviewCount)
        .map(([id, { name, totalRating, count }]) => ({
            id: Number(id),
            name,
            averageRating: totalRating / count,
            reviewCount: count
        }))
        .sort((a, b) => b.averageRating - a.averageRating);
}

// Returns the product with the highest rating
export async function highestReviewedProduct(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, rating, item:items!id (id, name)")

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }
    const ReviewCount: Record<number, { name: string; totalRating: number; count: number  }> = {};
    data.forEach((item) => {
        const id = Array.isArray(item.item)
            ? (item.item as { id: number }[])[0]?.id
            : (item.item as { id: number }).id;
        const name = Array.isArray(item.item)
            ? (item.item as { name: string }[])[1]?.name
            : (item.item as { name: string }).name;
        const rating = item.rating;
        const product = Array.isArray(item.item) ? item.item[0] : item.item;
        if (!item || !item.id) return;
        if (!ReviewCount[id]) {
            ReviewCount[id] = { name, totalRating: 0, count: 0 };
        }
        ReviewCount[id].totalRating += rating;
        ReviewCount[id].count += 1;
    })

    const reviewList = Object.entries(ReviewCount)
        .map(([id, { name, totalRating, count }]) => ({
            id: Number(id),
            name,
            averageRating: totalRating / count,
            reviewCount: count
        }))
        .sort((a, b) => b.averageRating - a.averageRating)

    return reviewList[0];
}

// Returns the date with the most reviews placed
export async function dateWithMostReviews(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, rating, created_at, item:items!id (id)")

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }

    const dateCount: Record<string, number> = {};

     let dateList = "This is a list of dates"

    data.forEach((item) => {
        const id = Array.isArray(item.item)
            ? (item.item as { id: number }[])[0]?.id
            : (item.item as { id: number }).id;
        const created_at = item.created_at;
        let timestampString = String(created_at)
        let date = timestampString.slice(0,10)
        dateList+=date;
        if (date) {
            dateCount[date] = (dateCount[date] || 0) + 1;
        }


    })
    let mostFrequentDate :string | null = null;
    let maxCount = 0;

    for (const date in dateCount){
        if (dateCount[date]>maxCount){
            mostFrequentDate = date;
            maxCount = dateCount[date];
        }
    }

    return mostFrequentDate ? {date: mostFrequentDate, count: maxCount} : null;
}

// Returns a list of days and how many reviews were done on the day
export async function listOfReviewsPerDay(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, rating, created_at, item:items!id (id)")

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }

    const dateCount: Record<string, number> = {};

    let dateList = "This is a list of dates"

    data.forEach((item) => {
        const created_at = item.created_at;
        let timestampString = String(created_at)
        let date = timestampString.slice(0,10)
        dateList+=date;
        if (date) {
            dateCount[date] = (dateCount[date] || 0) + 1;
        }


})
    return dateCount;
}

// Returns a list of every possible rating and how many reviews have this rating
export async function ratingDistribution(){
    const {data, error} = await catalogSupabase
        .from("reviews")
        .select("id, rating, item:items!id (id)")

    if (error){
        console.log("Error fetching reviews:", error);
        return 0;
    }

    const ratingDistributionTable: Record<string, number> = {};

    let dateList = "This is a list of dates"

    data.forEach((item) => {
        const rating = item.rating;
        if (rating){
            ratingDistributionTable[rating] = (ratingDistributionTable[rating] || 0 ) + 1;
        }

})
    return ratingDistributionTable;
}
