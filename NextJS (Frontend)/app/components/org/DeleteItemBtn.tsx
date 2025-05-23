'use client'
import { useState } from "react";

interface DeleteItemBtnProps {
  productId: number;
}

export default function DeleteItemBtn({ productId }: DeleteItemBtnProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/deleteProduct", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
      
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete");

      window.location.reload()
    } catch (error: any) {
      console.error("Delete failed:", error.message);
    } finally {
      setShowConfirm(false);
      setLoading(false);
    }
    window.location.reload()
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className=""
      >
        Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-semibold">Are you sure you want to delete?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}