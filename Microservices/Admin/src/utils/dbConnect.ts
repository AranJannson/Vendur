import { createClient } from "@supabase/supabase-js";

export function connectCatalog() {
  const supabase = createClient(process.env.CATALOUGE_SUPABASE_URL as string, process.env.CATALOUGE_SUPABASE_ANON_KEY as string);
  return supabase;
}

export function connectOrgMgmt() {
  const supabase = createClient(process.env.ORG_SUPABASE_URL as string, process.env.ORG_SUPABASE_ANON_KEY as string);
  return supabase;
}
