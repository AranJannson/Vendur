import { connectCatalog } from "./dbConnect"
import { connectOrgMgmt } from "./dbConnect"

const cat_supabase = connectCatalog();
const org_supabase = connectOrgMgmt();

export async function deleteProductById(id: string): Promise<{ error: string | null }> {
  
    const { error } = await cat_supabase.from('items').delete().eq('id', id);
    if (error) {
      return { error: error.message };
    }
  
    return { error: null };
  }

export async function getAllOrgs() {
    const { data, error } = await org_supabase.from('orgs').select('*');
    if (error) {
        return { error: error.message, data: null};
        }
    return data;
    }

export async function orgDetails(id: string): Promise<{data: any, error: string | null }> {
    const { data, error } = await org_supabase.from("orgs").select("*").eq("id", id).maybeSingle();
    
    if (error) {
        console.error("Error fetching organisation details:", error.message);
        return { data: null, error: error.message };
      }
    return { data, error: null };
      }

export async function updateOrganisationByID(id: string, updateData: {email: string, name: string,
     description: string,
     telephone: string,
     website: string,
     address: string ,
     product_type: string, 
     shipping_type: string,
     active: boolean,
     is_verified: boolean
    }): Promise<{ data: any, error: string | null }> {
    try {
        const { email, name, description, telephone, website, address, product_type, shipping_type, active, is_verified } = updateData;
        const { data, error } = await org_supabase.from("orgs").update({
            email,
            name,
            description,
            telephone,
            website,
            address,
            product_type,
            shipping_type,
            active, 
            is_verified
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
export async function getVerificationRequests() {
  const { data, error } = await org_supabase.from('verification_requests').select('*');
  if (error) {
      return { error: error.message, data: null};
      }
  return data;
  }

export async function getVerificationRequest(id: number): Promise<{data: any, error: string | null }> {
    const { data, error } = await org_supabase.from("verification_requests").select("*").eq("id", id).maybeSingle();

    if (error) {
        console.error("Error fetching organisation details:", error.message);
        return { data: null, error: error.message };
        }
    return { data, error: null };
    }

export async function acceptVerificationRequest(id: number, org_id: string, shippingMethod: string, productInfo: string, image_document: string, image_thumbnail: string): Promise<{ data: any, error: string | null }> {
    try {
        const { data: orgData, error: orgError } = await org_supabase.from("orgs").update({ is_verified: true, shipping_type: shippingMethod, product_type: productInfo, image_document: image_document, image_thumbnail: image_thumbnail }).eq("id", org_id).maybeSingle();
        if (orgError) return { data: null, error: orgError.message };
        const { data: verificationData, error: verificationError } = await org_supabase.from("verification_requests").delete().eq("id", id).maybeSingle();
        if (verificationError) return { data: null, error: verificationError.message };
    
        return { data: { orgData, verificationData }, error: null };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { data: null, error: "Unexpected error occurred" };
    }
}

export async function denyVerificationRequest(id: number): Promise<{data: any, error: string | null }> {
    const { data, error } = await org_supabase.from("verification_requests").delete().eq("id", id).maybeSingle();

    if (error) {
        console.error("Error fetching organisation details:", error.message);
        return { data: null, error: error.message };
        }
    return { data, error: null };
    }

export async function getVerificationRequestStatus(org_id: string) {
    const { data, error } = await org_supabase.from('verification_requests').select('id').eq("org_id", org_id);
    if (error) {
        console.error("Supabase error:", error.message);
        return null;
    }
    return data && data.length > 0;
    }