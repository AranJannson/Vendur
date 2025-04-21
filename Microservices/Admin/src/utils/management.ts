import { connect } from "./dbConnect"

const supabase = connect();

export async function deleteProductById(id: string): Promise<{ error: string | null }> {
  
    const { error } = await supabase.from('items').delete().eq('id', id);
    console.log('(MANAGEMENT) Deleting product with id:', id);
    if (error) {
      return { error: error.message };
    }
  
    return { error: null };
  }

export async function getAllOrgs() {

    const { data, error } = await supabase.from('organisations').select('*');
  
    if (error) {
        return { error: error.message, data: null};
        }
    
    return data;
    }

export async function orgDetails(vendur_id: string): Promise<{data: any, error: string | null }> {
    console.log(vendur_id);
    const { data, error } = await supabase.from("organisations").select("*").eq("id", vendur_id).single();
    
    if (error) {
        console.error("Error fetching organisation details:", error.message);
        return { data: null, error: error.message };
      }
    return { data, error: null };
      }

export async function updateOrganisationByID(id: string, updateData: {email: string, name: string, description: string, telephone: string, website: string, address: string }): Promise<{ data: any, error: string | null }> {
    try {
        const { email, name, description, telephone, website, address } = updateData;
        const { data, error } = await supabase.from("organisations").update({
            email,
            name,
            description,
            telephone,
            website,
            address
        }).eq("id", id);
    
        if (error) {
        return { data: null, error: error.message };
        }
        return { data, error: null };
    } catch (err) {
        console.error("Unexpected error:", err);
        return { data: null, error: "An unexpected error occurred" };
    }
      }