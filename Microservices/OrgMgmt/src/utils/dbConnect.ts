import { createClient } from "@supabase/supabase-js";



export function connectCatalogue() {
  const supabase = createClient(process.env.CATALOGUE_SUPABASE_URL as string, process.env.CATALOGUE_SUPABASE_ANON_KEY as string);
  return supabase;
}

export function connect() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  return supabase;
}