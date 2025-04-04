import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL as string,
    process.env.PUBLIC_SUPABASE_ANON_KEY as string
);

export function listenToPresenceEvents(channelName: string = 'room_01') {
    const room = supabase.channel(channelName, {
        config: {
            presence: {
                key: 'user_' + Math.random().toString(36).substring(2, 8),
            },
        },
    });

    room
        .on('presence', { event: 'sync' }, () => {
            const newState = room.presenceState();
            console.log('sync', newState);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
            console.log('join', key, newPresences);
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
            console.log('leave', key, leftPresences);
        });

    room.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
            console.log(`Subscribed to presence on "${channelName}"`);
        }
    });
}