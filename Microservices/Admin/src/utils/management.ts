import { connectCatalog } from "./dbConnect";
import { connectOrgMgmt } from "./dbConnect";

const cat_supabase = connectCatalog();
const org_supabase = connectOrgMgmt();

export async function deleteProductById(id: string): Promise<{ error: string | null }> {
  console.log("Deleting product with ID:", id);

  const { err } = await cat_supabase.from('stock').delete().eq('item_id', id);
  const { error } = await cat_supabase.from('items').delete().eq('id', id);

  if (err) {
    console.error("Error deleting product stock:", error.message);
    return { error: error.message };
  }
  if (error) {
    console.error("Error deleting product:", error.message);
    return { error: error.message };
  }

  console.log("Product deleted successfully");
  return { error: null };
}

export async function getAllOrgs() {
  console.log("Fetching all organisations...");
  const { data, error } = await org_supabase.from('orgs').select('*');

  if (error) {
    console.error("Error fetching organisations:", error.message);
    return { error: error.message, data: null };
  }

  console.log("Organisations fetched:", data);
  return data;
}

export async function orgDetails(id: string): Promise<{ data: any, error: string | null }> {
  console.log("Fetching organisation details for ID:", id);
  const { data, error } = await org_supabase.from("orgs").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("Error fetching organisation details:", error.message);
    return { data: null, error: error.message };
  }

  console.log("Organisation details retrieved:", data);
  return { data, error: null };
}

export async function updateOrganisationByID(
  id: string,
  updateData: {
    email: string;
    name: string;
    description: string;
    telephone: string;
    website: string;
    address: string;
    product_type: string;
    shipping_type: string;
    active: boolean;
    is_verified: boolean;
  }
): Promise<{ data: any, error: string | null }> {
  console.log("Updating organisation with ID:", id);
  console.log("Update payload:", updateData);

  try {
    const { data, error } = await org_supabase.from("orgs").update(updateData).eq("id", id);

    if (error) {
      console.error("Error updating organisation:", error.message);
      return { data: null, error: error.message };
    }

    console.log("Organisation updated successfully:", data);
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { data: null, error: "An unexpected error occurred" };
  }
}

export async function getVerificationRequests() {
  console.log("Fetching all verification requests...");
  const { data, error } = await org_supabase.from('verification_requests').select('*');

  if (error) {
    console.error("Error fetching verification requests:", error.message);
    return { error: error.message, data: null };
  }

  console.log("Verification requests fetched:", data);
  return data;
}

export async function getVerificationRequest(id: number): Promise<{ data: any, error: string | null }> {
  console.log("Fetching verification request with ID:", id);
  const { data, error } = await org_supabase.from("verification_requests").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("Error fetching verification request:", error.message);
    return { data: null, error: error.message };
  }

  console.log("Verification request retrieved:", data);
  return { data, error: null };
}

export async function acceptVerificationRequest(
  id: number,
  org_id: string,
  shippingMethod: string,
  productInfo: string,
  image_document: string,
  image_thumbnail: string
): Promise<{ data: any, error: string | null }> {
  console.log("Accepting verification request:", { id, org_id, shippingMethod, productInfo });

  try {
    const { data: orgData, error: orgError } = await org_supabase.from("orgs")
      .update({
        is_verified: true,
        shipping_type: shippingMethod,
        product_type: productInfo,
        image_document,
        image_thumbnail,
      })
      .eq("id", org_id)
      .maybeSingle();

    if (orgError) {
      console.error("Error updating org verification:", orgError.message);
      return { data: null, error: orgError.message };
    }

    const { data: verificationData, error: verificationError } = await org_supabase
      .from("verification_requests")
      .delete()
      .eq("id", id)
      .maybeSingle();

    if (verificationError) {
      console.error("Error deleting verification request:", verificationError.message);
      return { data: null, error: verificationError.message };
    }

    console.log("Verification accepted. Org and request updated.");
    return { data: { orgData, verificationData }, error: null };
  } catch (error) {
    console.error("Unexpected error during verification acceptance:", error);
    return { data: null, error: "Unexpected error occurred" };
  }
}

export async function denyVerificationRequest(id: number): Promise<{ data: any, error: string | null }> {
  console.log("Denying verification request with ID:", id);
  const { data, error } = await org_supabase.from("verification_requests").delete().eq("id", id).maybeSingle();

  if (error) {
    console.error("Error deleting verification request:", error.message);
    return { data: null, error: error.message };
  }

  console.log("Verification request denied and deleted:", data);
  return { data, error: null };
}

export async function getVerificationRequestStatus(org_id: string) {
  console.log("Checking verification request status for org ID:", org_id);
  const { data, error } = await org_supabase.from('verification_requests').select('id').eq("org_id", org_id);

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }

  const hasRequest = data && data.length > 0;
  console.log(`Verification request exists for org? ${hasRequest}`);
  return hasRequest;
}
