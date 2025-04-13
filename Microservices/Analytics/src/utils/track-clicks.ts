import { createClient } from '@supabase/supabase-js';

const analyticsSupabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

export async function returnAllClickCountPages(): Promise<{ data: any; error?: string }> {

    const { data } = await analyticsSupabase
        .from('page_clicks')
        .select('page, count')
        .order('count', { ascending: false });

    return { data };
}

export default async function trackClicks(page: string): Promise<any> {
    if (!page) {
        return;
    }

    const { data: exitstingReference, error } = await analyticsSupabase
        .from('page_clicks')
        .select('count')
        .eq('page', page)
        .single();

    if (exitstingReference){

        const { error } = await analyticsSupabase
            .from('page_clicks')
            .update({ count: exitstingReference.count + 1 })
            .eq('page', page);

    }else{
        const { error } = await analyticsSupabase
            .from('page_clicks')
            .insert({ page, count: 1 });

    }

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    return;
}
