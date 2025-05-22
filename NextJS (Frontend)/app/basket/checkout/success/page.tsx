"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

interface DeliveryAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string;
  postal_code: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Order {
  id: number;
  item_id: number;
  quantity: number;
  status: string;
  item?: Item;
}

interface OrderDetails {
  id: number;
  user_id: string;
  ordered_at: string;
  delivery_address: DeliveryAddress | string;
  full_name: string;
  total_cost: number;
  orders: Order[];
  status: string;
}

async function getOrderDetails(order_id: string): Promise<OrderDetails | null> {
  try {
    console.log("Fetching order details for order_id:", order_id);

    const response = await fetch("/api/getOrderDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ order_id }),
    });

    const data = await response.json();
    console.log("Raw response from API:", data);

    const details = data.orderDetails;

    // Parse delivery_address if it's a string
    if (typeof details.delivery_address === "string") {
      details.delivery_address = JSON.parse(details.delivery_address);
    }

    console.log("Processed order details:", details);
    return details;
  } catch (error) {
    console.error("Error retrieving order details:", error);
    return null;
  }
}

export default function Success() {
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");

  useEffect(() => {
    if (!order_id) {
      console.warn("No order_id found in URL.");
      setDetailsLoading(false);
      return;
    }

    setDetailsLoading(true);
    getOrderDetails(order_id).then((details) => {
      if (details) {
        console.log("Setting orderDetails state:", details);
        setOrderDetails(details);
      } else {
        console.warn("No order details found.");
      }
      setDetailsLoading(false);
    });
  }, [order_id]);

  return (
    <div className="bg-secondary-400 p-4 m-4 rounded-xl shadow-xl">
      <Head>
        <title>Checkout | Vendur</title>
      </Head>

      <div className="bg-secondary-300 p-4 rounded-lg font-bold text-3xl">
        <p>Transaction successful!</p>
      </div>

      <div className="flex flex-col items-centre justify-centre bg-secondary-300 p-4 rounded-lg mt-4">
        <p className="font-bold text-2xl">Your Order Number Is:</p>
        <p className="font-mono text-2xl">{orderDetails?.id || order_id}</p>
      </div>

      {orderDetails && (
        <>
          <div className="bg-secondary-300 p-4 rounded-lg mt-4">
            <p className="font-bold text-xl">Delivery address:</p>
            <ul className="list-disc list-inside">
              {Object.values(orderDetails.delivery_address).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary-300 p-4 rounded-lg mt-4">
            <p className="font-bold text-xl mb-2">Order Summary:</p>
            <p><strong>Ordered At:</strong> {new Date(orderDetails.ordered_at).toLocaleString()}</p>
            <p><strong>Order Status:</strong> {orderDetails.status}</p>
            <p><strong>Total Cost:</strong> £{orderDetails.total_cost.toFixed(2)}</p>
          </div>

          {orderDetails.orders?.length > 0 ? (
            <div className="bg-secondary-300 p-4 rounded-lg mt-4">
              <p className="font-bold text-xl mb-2">Items:</p>
              {orderDetails.orders.map((order) => (
                <div key={order.id} className="mb-4 border-b border-secondary-200 pb-4">
                  <div className="flex items-centre gap-4">
                    {order.item?.image && (
                      <img
                        src={order.item.image}
                        alt={order.item.name}
                        className="w-24 h-24 object-contain"
                      />
                    )}
                    <div>
                      <p><strong>Item:</strong> {order.item?.name || `Item ID ${order.item_id}`}</p>
                      <p><strong>Quantity:</strong> {order.quantity}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                      {order.item?.price && (
                        <p><strong>Price per unit:</strong> £{order.item.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base">No item information available.</p>
          )}
        </>
      )}

      {detailsLoading && <p className="mt-4 text-lg">Loading details...</p>}

      <div className="my-8">
        <Link
          href="/"
          role="button"
          className="bg-primary-200 p-4 rounded-lg transition-colours hover:bg-primary-100 px-8 mt-4"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
