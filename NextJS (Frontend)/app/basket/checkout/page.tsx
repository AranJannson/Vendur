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

  const amount = basket.reduce((total: number, item: any) => {
    return total + item.price * item.quantity;
  }, 0);

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
      <h2>Items:</h2>
      <ul className="flex gap-8 overflow-x-auto p-4">
        {basket.map((item, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <div className="bg-secondary-100 max-w-[10rem] max-h-[10rem] p-4 m-4 rounded-lg flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                width="200"
                height="200"
                className="object-contain"
              />
            </div>
            <p>Id: {item.id}</p>
            <p>Price: £{item.price.toFixed(2)}</p>
            <p>{item.size && `Size: ${item.size}`}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <p>Total: £{amount.toFixed(2)}</p>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm basket={basket} amount={amount}/>
        </Elements>
      )}
    </div>
  );
}

export default Checkout;