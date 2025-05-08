"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getOrderDetails (order_id: string) {
  
  const response = await fetch(`http://localhost:8002/getOrderDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      order_id
    })
  });

  const data = await response.json();

  const addressString = data.orderDetails.delivery_address;
  const addressObject = JSON.parse(addressString);
  const addressList = [
    addressObject.line1,
    addressObject.line2,
    addressObject.city,
    addressObject.state,
    addressObject.postal_code,
    addressObject.country
  ].filter(Boolean);

  return addressList;
}

export default function Success() {
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [address, setAddress] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  
  useEffect(() => {
    setDetailsLoading(true);
    if (order_id) {
      getOrderDetails(order_id).then(orderDetails => {
        setAddress(orderDetails);
        setDetailsLoading(false);
    });
    } else {
      setDetailsLoading(false);
    }
  }, [])

  return (
    <div>
      <p>Transaction successful!</p>
      <p>Your order id: {order_id}</p>
      <p>Delivery address: </p>
      {address?.map((line, i) => (
        <p key={i}>{line}</p> 
      ))}
      <a href="/payment">
        <button className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
          Back to basket
        </button>
      </ a>

      {detailsLoading && (<p>Loading details...</p>)}
    </div>
  );
}
