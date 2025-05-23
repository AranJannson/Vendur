"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/app/components/payment/CheckoutForm";
import { useUser } from "@stackframe/stack";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
  discount: number;
}

interface Basket{

user_id: string;
created_at: Date;
items: number[];
quantities: number[];

}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function Checkout() {
    const userId = useUser()?.id;

    const [loading, setLoading] = useState(true);

    let [itemDetails, setItemDetails] = useState<Item[]>([]);
    const [basket, setBasket] = useState<Basket>();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
      const fetchBasketAndItems = async () => {
        if (!userId) return;

        setLoading(true);

        try {
          const response = await fetch("/api/getBasketNew", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId }),
          });
          console.log("Response from getBasketNew:", response);
          const data = await response.json();
          // console.log("Fetched basket:", data.basket);
          setBasket(data.basket);

          if (data.basket?.items?.length) {
            const itemDetails: Item[] = await Promise.all(
              data.basket.items.map(async (itemId: number): Promise<Item> => {
                const res = await fetch("/api/getItemByID", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: itemId }),
                });

                const itemData = await res.json();
                console.log("Fetched item:", itemData);
                return itemData.item ?? itemData;
              })
            );

            setItemDetails(itemDetails);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBasketAndItems();
    }, [userId]);

  useEffect(() => {
  if (!basket || itemDetails.length === 0) return;

  // Construct the items array as expected by the backend
  const paymentItems = itemDetails.map((item, index) => ({
    id: item.id,
    price: item.price,
    quantity: basket.quantities?.[index] ?? 1,
  }));

  console.log("Sending to createPaymentIntent:", paymentItems);

  fetch("/api/createPaymentIntent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: paymentItems }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Received clientSecret:", data.clientSecret);
      setClientSecret(data.clientSecret);
    })
    .catch((error) => {
      console.error("Error fetching client secret:", error);
    });
}, [basket, itemDetails]);


    // console.log(`Checkout Page: Basket: ${JSON.stringify(basket)}`);

    // console.log(`Checkout Page: Item Details: ${JSON.stringify(itemDetails)}`);
    if (loading) return <p>Loading...</p>;
  // const amount = itemDetails.reduce((sum, item, index) => {return sum + item.price * (basket?.quantities[index] ?? 1);}, 0).toFixed(2)
    const amount = itemDetails.length > 0 && basket!.quantities?.length > 0
  ? itemDetails.reduce((total, item, index) => {
      const quantity = Number(basket!.quantities[index] ?? 1);
      const basePrice = Number(item.price ?? 0);
      const discount = Number(item.discount ?? 0);

      const discountedPrice = basePrice * (1 - discount / 100);
      return total + discountedPrice * quantity;
    }, 0)
  : 0;

    itemDetails = itemDetails.map((item, index) => ({
        ...item,
        quantity: basket?.quantities[index] ?? 1,
    }));

    console.log(`Checkout Page: Amount: ${amount}`);

  // if (basketLoading) return <p>Loading items...</p>;
  return (
    <div className="bg-secondary-400 m-4 p-4 rounded-lg shadow-lg">
      <title>Checkout | Vendur</title>
      <h2 className="text-3xl font-bold mb-2">Your Basket</h2>
      <ul className="flex gap-8 p-4 overflow-x-scroll bg-secondary-300 rounded-lg">
        {itemDetails.map((item, index) => (
          <li key={index} className="mb-4 bg-background-200 p-4 rounded-lg shadow-md flex flex-col items-center">
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
            <p>Price: <b>£{(item.price * (1 - (item.discount ?? 0) / 100)).toFixed(2)}</b></p>
            <p>{item.size && `Size: ${item.size}`}</p>
            <p>Quantity: <b>{item.quantity}</b></p>
          </li>
        ))}
      </ul>
      <div className="bg-secondary-300 p-4 rounded-lg shadow-md my-4">
        <h2 className="text-2xl">Total Cost: <b>£{amount}</b></h2>
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm basket={itemDetails} amount={amount}/>
        </Elements>
      )}
    </div>
  );
}

export default Checkout;