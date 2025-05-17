"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="bg-secondary-400 p-4 m-4 rounded-xl shadow-xl">
      <div className="bg-secondary-300 p-4 rounded-lg font-bold text-3xl">
        <p>Transaction successful!</p>
      </div>

      <div className="flex flex-col items-center justify-center bg-secondary-300 p-4 rounded-lg mt-4">
        <p className="font-bold text-2xl">Your Order Number Is: </p>
        <p className="font-mono text-2xl">{order_id}</p>
      </div>

      <div className="bg-secondary-300 p-4 rounded-lg mt-4">
        <p className="font-bold">Delivery address: </p>
        {address?.map((line, i) => (
            <p key={i}>{line}</p>
        ))}
      </div>


      <div className="my-8">
        <Link href="/" className="bg-primary-200 p-4 rounded-lg transition-colors hover:bg-primary-100 px-8 mt-4">
          Back
        </Link>
      </div>


      {detailsLoading && (<p>Loading details...</p>)}
    </div>
  );
}
