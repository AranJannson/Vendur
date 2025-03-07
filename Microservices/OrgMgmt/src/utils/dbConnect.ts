import { createClient } from "@supabase/supabase-js";



export function connect() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  return supabase;
}

export async function testConnection() {

  const supabase = await connect();

  const { data } = await supabase.from('items').select('*');
  console.log(data);
}