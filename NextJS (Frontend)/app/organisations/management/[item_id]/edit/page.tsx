'use client'
import { useEffect, useState } from "react";
import EditProducts from "@/app/components/forms/EditProducts";

export default function EditProductPage({ params }: { params: Promise<{ item_id: string }> }) {
  const [paramsResolved, setParamsResolved] = useState<{ item_id: string } | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [userOrgId, setUserOrgId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setParamsResolved(resolvedParams);
    }).catch((err) => {
      setError("Failed to load params");
      console.error(err);
    });
  }, [params]);

  useEffect(() => {
    const fetchUserOrgId = async () => {
      try {
        const res = await fetch("/api/organisations/get-org-id");
        const data = await res.json();

        if (res.ok) {
          setUserOrgId(data.orgId);
        } else {
          setError(data.error || "Error fetching user data");
        }
      } catch (err) {
        setError("Error fetching user data.");
        console.error(err);
      }
    };

    fetchUserOrgId();
  }, []);

  useEffect(() => {
    if (paramsResolved?.item_id) {
      const fetchProductAndStock = async () => {
        try {
          // Fetch product info
          const productRes = await fetch(`/api/organisations/products/get-product-info?id=${paramsResolved.item_id}`);
          const productData = await productRes.json();

          if (!productRes.ok || !productData[0]) {
            setError("Product not found.");
            return;
          }

          // Fetch stock info
          const stockRes = await fetch(`/api/organisations/products/get-stock`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ item_id: paramsResolved.item_id }),
            cache: "no-store",
          });

          const stockData = await stockRes.json();
          const stock = stockData?.stock ?? 0;

          // Combine product and stock
          setProduct({ ...productData[0], stock });
        } catch (err) {
          setError("Error fetching product data.");
          console.error(err);
        }
      };

      fetchProductAndStock();
    }
  }, [paramsResolved]);

  if (!userOrgId || !paramsResolved || !product) {
    return <div>Loading...</div>;
  }

  if (product.org_id !== userOrgId) {
    return <div>You are not authorized to edit this product.</div>;
  }

  return (
    <div>
      <EditProducts product={product} />
    </div>
  );
}
