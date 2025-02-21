import { createServerClient } from "@supabase/ssr";
import { headers } from "next/headers";
import cookie from "cookie";

export const createClient = async () => {
    // Await the headers function to get the header values
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";

    // Parse the cookies into an object
    const parsedCookies = cookie.parse(cookieHeader);

    // Create a custom cookieStore with getAll and setAll methods
    const cookieStore = {
        getAll: () =>
            Object.keys(parsedCookies).map((name) => ({
                name,
                value: parsedCookies[name],
            })),
        setAll: (cookiesToSet: Array<{ name: string; value: string; options?: any }>) => {
            cookiesToSet.forEach(({ name, value, options }) => {
                // Implement your logic to set cookies here if needed.
                // In a Server Component, setting cookies might be handled differently.
            });
        },
    };

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: cookieStore }
    );
};
