import { useState, useEffect } from "react";

interface RequestProps {
  id: number;
}

interface RequestData {
  id: number;
  org_id: string;
  name: string;
  description: string;
  email: string;
  created_at: string;
  productInfo: string;
  shippingMethod: string;
  image_document: string;
  image_thumbnail: string;
}

export default function ViewVerificationRequest({ id }: RequestProps) {
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch("/api/admin/verificationRequests/getSingleRequest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch request.");

        setRequestData(data);
      } catch (error: any) {
        console.error("Failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return <p>Loading request...</p>;
  }

  if (!requestData) {
    return <p>Request not found.</p>;
  }

const handleSubmitAccept = async () => {
  try {
    const res = await fetch('/api/admin/verificationRequests/acceptRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: requestData.id,
        org_id: requestData.org_id,
        shippingMethod: requestData.shippingMethod,
        productInfo: requestData.productInfo,
        image_document: requestData.image_document,
        image_thumbnail: requestData.image_thumbnail
      }),
    });
    

    if (res.ok) {
      window.location.reload();
    } else {
      console.error("Failed to accept the request", res.statusText);
    }
  } catch (error) {
    console.error("Error in submitting accept request:", error);
  }
};

const handleSubmitDeny = async () => {
  try {
    const res = await fetch('/api/admin/verificationRequests/denyRequest', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: requestData.id,
      }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      console.error("Failed to deny the request", res.statusText);
    }
  } catch (error) {
    console.error("Error in submitting deny request:", error);
  }
};


  return (
    <div className="grid grid-cols-1 gap-4 p-6 bg-gray-50 rounded-lg shadow-md h-fit">
      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Name</label>
        <div className="p-4 border rounded-lg bg-white">{requestData.name}</div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Email</label>
        <div className="p-4 border rounded-lg bg-white">{requestData.email}</div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Description</label>
        <div className="p-4 border rounded-lg bg-white">{requestData.description}</div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Product Info</label>
        <div className="p-4 border rounded-lg bg-white">{requestData.productInfo}</div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Shipping Method</label>
        <div className="p-4 border rounded-lg bg-white">{requestData.shippingMethod}</div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Created At</label>
        <div className="p-4 border rounded-lg bg-white">
          {new Date(requestData.created_at).toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-2">Uploaded Document</label>
          <img
          src={requestData.image_document}
          alt="Document"
          width={1000}
          height={1000}
          className="object-cover border rounded-lg"
          ></img>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 mb-2">Uploaded Shop Thumbnail</label>
        <div className="flex justify-center">
          <img
          src={requestData.image_thumbnail}
          alt="Shop Thumbnail"
          width={400}
          height={600}

          onLoad={(e) => {
            const img = e.currentTarget;
            setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
          }}
          className="object-cover border rounded-lg "
          ></img>
        </div>
          {imageSize && (
            <span className="text-sm text-gray-500 mt-2">
              Uploaded Image size: {imageSize.width} × {imageSize.height}
            </span>
          )}
      </div>

      <button
        onClick={handleSubmitAccept}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
        {"Accept Verification Request"}
      </button>
      <button
        onClick={handleSubmitDeny}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg">
        {"Deny Verification Request"}
      </button>
    </div>
  );
}
