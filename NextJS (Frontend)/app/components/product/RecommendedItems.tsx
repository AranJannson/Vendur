"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@stackframe/stack";

interface Item {
  id: number;
  name: string;
  image: string;
  category: string;
  discount: number;
  rating?: number;
  price: number;
}

export default function RecommendedItems() {
  const user = useUser();
  const user_id = user?.id;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!user_id) {
      console.warn("[RecommendedItems] No user_id available");
      setLoading(false);
      return;
    }

    const fetchRecs = async () => {
      console.log("[RecommendedItems] fetching for user_id:", user_id);
      try {
        const res = await fetch("/api/recommended-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id }),
        });
        console.log("[RecommendedItems] API responded with status:", res.status);

        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || res.statusText);
        }

        const data: Item[] = await res.json();
        console.log("[RecommendedItems] data received:", data);
        setItems(data);
      } catch (err: any) {
        console.error("[RecommendedItems] failed to fetch recs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [user_id]);

  if (loading) return <p>Loading recommended items…</p>;
  if (error)   return <p>Error loading recommendations: {error}</p>;
  if (!items.length) return null;

  return (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-2">Recommended for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="border rounded-lg p-2">
            <Link href={`/products/${encodeURIComponent(item.name)}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-contain"
              />
              <h3 className="mt-2 font-medium">{item.name}</h3>
              <p>£{item.price.toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
