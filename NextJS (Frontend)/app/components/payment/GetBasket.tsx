import DeleteBasketButton from "@/app/components/payment/DeleteBasketButton";
import DeleteItemButton from "@/app/components/payment/DeleteItemButton";
import { useEffect, useState } from "react";
import GetBasketCountdownTimer from "./GetBasketCountdownTimer";
import { getOriginalStock, modifyStock } from "@/utils/catalogue/utils";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm'

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function GetBasket() {
  const [basket, setBasket] = useState<Item[]>([]);
  const [basketLoading, setBasketLoading] = useState(true);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchBasket = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getBasket", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- include cookies!
      });

      if (!response.ok) {
        throw new Error("Failed to fetch basket");
      }

      const data: Item[] = await response.json();
      setBasket(data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    } finally {
      setBasketLoading(false);
    }
  };

  useEffect(() => {
    if (!basket || basket.length === 0) return;

    fetch('http://localhost:8002/createPaymentIntent', {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: basket })
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))
    .catch(error => console.error("Error fetching client secret:", error));
  }, [basket]);

  useEffect(() => {
    fetchBasket();
  }, []);

  if (basketLoading) return <p>Loading basket...</p>;

  return (
    <div>
      <h2>Basket:</h2>
      {basket && basket.length > 0 ? (
        <div>
          <ul>
            {basket.map((item, index) => (
              <li key={index} className="mb-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <div className="bg-secondary-100 max-w-[10rem] max-h-[10rem] p-4 m-4 rounded-lg flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="300"
                    height="300"
                    className="object-contain"
                  />
                </div>
                <p>Id: {item.id}</p>
                <p>Price: £{item.price.toFixed(2)}</p>
                {item.size !== null && (
                  <div>
                    <label className="font-bold ml-1">Size</label>
                    <select
                      className="p-2 bg-primary-200 rounded-full w-13 ml-2"
                      name="size"
                      defaultValue={item.size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length === 1){
                          setBasket((prevBasket) => 
                          prevBasket.map((basketItem) =>
                          basketItem.id === item.id ? { ...basketItem, size: value as Item["size"]} : basketItem))
                        }
                      }}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                )}
                <label className="font-bold ml-1">Quantity</label>
                <select
                  value={item.quantity} // Set selected value to current quantity
                  onChange={ async (e) => {
                    if (quantityLoading) return; // Prevent multiple clicks while basketLoading
                  
                    setQuantityLoading(true); // Set basketLoading to true when request starts
                  
                    try {
                      const newQuantity = parseInt(e.target.value);
                      const difference = item.quantity - newQuantity;
                  
                      await modifyStock(item, difference);
                  
                      setBasket((prevBasket) =>
                        prevBasket.map((basketItem) =>
                          basketItem.id === item.id ? { ...basketItem, quantity: newQuantity } : basketItem
                        )
                      );
                    } catch (error) {
                      console.error("Error modifying stock:", error);
                    } finally {
                      setQuantityLoading(false); // Set basketLoading to false when request finishes
                    }
                  }}
                  className="p-2 bg-primary-200 rounded-full w-13 ml-2"
                  name="quantity"
                >
                  {Array.from({ length: Math.min(getOriginalStock(Number(item.id)) || 0, 10) }, (_, i) => i + 1).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <DeleteItemButton item={item} refreshBasket={fetchBasket} />
              </li>
            ))}
          </ul>
          {basket.length != 1 && (
            <DeleteBasketButton basket={basket} refreshBasket={fetchBasket} />
          )}
          {quantityLoading && "Loading quantity..."}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
          <GetBasketCountdownTimer basket={basket} />
        </div>
      ) : (
        <p>No items in basket.</p>
      )}
    </div>
  );
}
