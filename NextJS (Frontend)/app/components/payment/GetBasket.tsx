'use client'

import { useUser } from "@stackframe/stack"
import {useEffect, useState} from "react";
import DeleteBasketButton from "@/app/components/payment/DeleteBasketButton";
import DeleteItemButton from "@/app/components/payment/DeleteItemButton";
import Link from "next/link"

interface Basket{

user_id: string;
created_at: Date;
items: number[];
quantities: number[];

}

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function GetBasket() {

    const userId = useUser()?.id

    const [basket, setBasket] = useState<Basket>();
    const [itemDetails, setItemDetails] = useState<Item[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

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

          const data = await response.json();
          setBasket(data.basket);

          if (data.basket?.items?.length) {
            const itemDetails: Item[] = await Promise.all(
              data.basket.items.map(async (itemId): Promise<Item> => {
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


    return (
        <div className="bg-secondary-400 rounded-xl m-4">
            <div className="bg-secondary-200 rounded-xl border-2 border-primary-500">
                <h1 className="text-3xl font-bold p-2">Your Basket</h1>
                <span className="flex flex-row gap-2 p-2">
                    <b>Checkout In: </b>
                    {/*<GetBasketCountdownTimer basket={basket} />*/}
                </span>
                <p className="p-2">To Secure Your Items Before They Sell Out!</p>
            </div>

            {isLoading ? (
                <div className="p-4 text-lg font-medium">Loading basket items...</div>
            ) : itemDetails.length > 0 ? (
                <div className="flex flex-col">
                    <ul className="flex flex-col gap-8 overflow-x-auto p-4 rounded-lg m-4">
                        {itemDetails.map((item, index) => (
                            <li
                                key={item.id}
                                className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 items-start bg-secondary-500 p-4 rounded-xl"
                            >
                                <Link
                                    href={`/products/${item.name}`}
                                    className="bg-secondary-200 w-fit h-full p-4 rounded-lg row-span-2 flex items-center"
                                >
                                    <img src={item.image} alt={item.name} width="150" height="150"/>
                                </Link>

                                <div className="flex flex-col w-full bg-secondary-100 p-4 rounded-lg text-left">
                                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                                    <p>
                                        <b>Id:</b>
                                        {item.id}
                                    </p>
                                    <p>
                                        <b>Price:</b>
                                        £{item.price.toFixed(2)}
                                    </p>

                                    <div
                                        className="bg-secondary-200 rounded-lg flex md:flex-row flex-col gap-2 justify-start items-center p-2 mt-2">
                                        <label className="font-bold">Quantity:</label>
                                        <select
                                            value={basket?.quantities[index] ?? 1}
                                            onChange={(e) => {
                                                const newQuantities = [...(basket?.quantities ?? [])];
                                                newQuantities[index] = parseInt(e.target.value);
                                                setBasket((prev) =>
                                                    prev ? {...prev, quantities: newQuantities} : prev
                                                );
                                            }}
                                            className="p-2 bg-primary-300 rounded-full w-13"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="self-start">
                                    <DeleteItemButton item_id={item.id} user_id={userId} refreshBasket={() => {
                                    }}/>
                                </div>
                            </li>
                        ))}

                        {itemDetails.length > 1 && (
                            <div className="bg-secondary-200 p-4 rounded-lg">
                                <h2 className="text-2xl font-bold">Changed Your Mind?</h2>
                                <DeleteBasketButton/>
                            </div>
                        )}

                        <div className="bg-secondary-200 p-4 rounded-lg grid grid-cols-1 gap-4">
                            <p className="text-2xl">
                                <b>Total:</b>
                                £
                                {itemDetails
                                    .reduce((sum, item, index) => {
                                        return sum + item.price * (basket?.quantities[index] ?? 1);
                                    }, 0)
                                    .toFixed(2)}
                            </p>
                            <a href="/payment/checkout">
                                <button
                                    className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                                    Go to Checkout
                                </button>
                            </a>
                        </div>
                    </ul>
                </div>
            ) : (
                <p className="p-4">No items in basket.</p>
            )}
        </div>

    );
}
