'use client';
import { useState } from 'react';

interface Props {
  productId: number;
}

export default function AddDiscountBtn({ productId }: Props) {
  const [discount, setDiscount] = useState<number>(0);

  const handleClick = async () => {
    console.log("[AddDiscountBtn] handleClick fired. productId:", productId, "discount:", discount);

    try {
      const res = await fetch('/api/add-discount', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId, discount }),
      });

      console.log("[AddDiscountBtn] API response status:", res.status);

      const data = await res.json();
      console.log("[AddDiscountBtn] Parsed response JSON:", data);

      if (res.ok) {
        console.log("[AddDiscountBtn] Discount added successfully:", data);
      } else {
        console.error("[AddDiscountBtn] Error adding discount:", data);
      }
    } catch (error) {
      console.error("[AddDiscountBtn] Network or unexpected error:", error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    console.log("[AddDiscountBtn] onChange value:", e.target.value, "parsed:", val);

    if (isNaN(val) || val < 0) {
      console.warn("[AddDiscountBtn] Invalid input, resetting to 0");
      setDiscount(0);
    } else if (val > 100) {
      console.warn("[AddDiscountBtn] Value >100%, capping to 100");
      setDiscount(100);
    } else {
      setDiscount(val);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="number"
        value={discount}
        onChange={onChange}
        max={100}
        min={0}
        placeholder="Enter discount percentage"
        className="border rounded p-2 mr-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleClick}
      >
        Add Discount
      </button>
    </div>
  );
}
