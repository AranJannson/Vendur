import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);


export async function getRandomItemImages(count: number) {
    const { data, error } = await supabase
        .from('items')
        .select('image');

    if (error) {
        console.log(error);
        return null;
    }

    const shuffled = data.slice();

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);

}
