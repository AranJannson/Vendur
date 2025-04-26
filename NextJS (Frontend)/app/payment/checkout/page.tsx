"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/app/components/payment/CheckoutForm";
import { fetchBasket } from "@/utils/payment/utils";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function Checkout() {
  const [basket, setBasket] = useState<Item[]>([]);
  const [basketLoading, setBasketLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!basket || basket.length === 0) return;

    fetch("http://localhost:8002/createPaymentIntent", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: basket }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error fetching client secret:", error));
  }, [basket]);

  useEffect(() => {
    const loadBasket = async () => {
      const data = await fetchBasket();
      setBasket(data);
      setBasketLoading(false);
    };

    loadBasket();
  }, []);

  if (basketLoading) return <p>Loading items...</p>;

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
