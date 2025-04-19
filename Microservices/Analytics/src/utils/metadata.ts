import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

const catalogSupabase = createClient(
    process.env.CATALOUGE_SUPABASE_URL as string,
    process.env.CATALOUGE_SUPABASE_ANON_KEY as string
);

export function presenceCheck(channelName: string = 'room_01'): Promise<string> {
    return new Promise((resolve, reject) => {
        const room = catalogSupabase.channel(channelName, {
            config: {
                presence: {
                    key: 'user_' + Math.random().toString(36).substring(2, 8),
                },
            },
        });

        room.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                const message = `Subscribed to presence on "${channelName}"`;
                console.log(message);
                resolve(message);
            } else {
                const message = `Failed to subscribe to "${channelName}" (status: ${status})`;
                console.error(message);
                reject(new Error(message));
            }
        });
    });
}
