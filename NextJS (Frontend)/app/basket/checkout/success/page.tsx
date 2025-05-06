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

  const data: any = await response.json();

  console.log(data);

  return data;
}

function parseAddress(address: string[]) {

}

export default function Success() {
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [address, setAddress] = useState<any>();

  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  
  useEffect(() => {
    setDetailsLoading(true);
    if (order_id) {
      getOrderDetails(order_id).then(orderDetails => {
        //const address = JSON.parse(raw.delivery_address);
        setAddress(parseAddress(address));
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
      <p>Your delivery address: {address?.delivery_address && !detailsLoading}</p>
      <a href="/payment">
        <button className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
          Back to basket
        </button>
      </ a>

      {detailsLoading && (<p>Loading details...</p>)}
    </div>
  );
}
