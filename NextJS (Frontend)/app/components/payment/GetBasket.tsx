'use client'

import { useUser } from "@stackframe/stack"
import {useEffect, useState} from "react";
import DeleteBasketButton from "@/app/components/payment/DeleteBasketButton";
import DeleteItemButton from "@/app/components/payment/DeleteItemButton";
import Link from "next/link"
import CheckoutButton from "@/app/components/payment/CheckoutButton";

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
  discount: number;
}

export default function GetBasket() {
    const user = useUser();
    if (!user) {
        return <p className="p-4">Please log in to view your basket.</p>;
    }
    const userId = user.id

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

    const amount = itemDetails.length > 0 && basket!.quantities?.length > 0
  ? itemDetails.reduce((total, item, index) => {
      const quantity = Number(basket!.quantities[index] ?? 1);
      const basePrice = Number(item.price ?? 0);
      const discount = Number(item.discount ?? 0);

      const discountedPrice = basePrice * (1 - discount / 100);
      return total + discountedPrice * quantity;
    }, 0)
  : 0;


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
                                        <b>Id: </b>
                                        {item.id}
                                    </p>
                                    <p>
                                        <b>Price: </b>
                                        {/* Find final price after discounts if any */}
                                        £{(item.price * (1 - (item.discount ?? 0) / 100)).toFixed(2)}
                                    </p>

                                    <div
                                        className="bg-secondary-200 rounded-lg flex md:flex-row flex-col gap-2 justify-start items-center p-2 mt-2">
                                        <b>Quantity: </b>
                                        {basket?.quantities[index] ?? 1}
                                    </div>
                                </div>

                                <div className="self-start">
                                    <DeleteItemButton item_id={item.id} user_id={userId} refreshBasket={() => {
                                        window.location.reload()
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
                                {amount.toFixed(2)}
                            </p>
                            {/* Update basket in db */}
                            <CheckoutButton handleClick={async () => {
                                if (basket) {
                                    await fetch("/api/modifyBasket", {
                                        method: "POST",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify({user_id: userId, basket}),
                                    });
                                }
                            }}/>
                        </div>
                    </ul>
                </div>
            ) : (
                <p className="p-4">No items in basket.</p>
            )}
        </div>

    );
}
