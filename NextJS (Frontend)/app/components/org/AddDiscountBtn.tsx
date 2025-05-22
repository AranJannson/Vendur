'use client';
import { useState } from 'react';

interface Props { productId: number; }

export default function AddDiscountBtn({ productId }: Props) {
  const [discount, setDiscount] = useState<number>(0);

  const handleClick = async () => {
    try {
      const res = await fetch('/api/add-discount', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, discount }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log('Discount added successfully:', data);
      } else {
        console.error('Error adding discount:', data);
      }
    } catch (error) {
      console.error('Error adding discount:', error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 0) {
      setDiscount(0);
    } else if (val > 100) {
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
