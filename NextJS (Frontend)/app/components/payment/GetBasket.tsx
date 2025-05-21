'use client'

import { useUser } from "@stackframe/stack"
import {useEffect, useState} from "react";


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
    useEffect(() => {
        const fetchBasket = async () => {
            const response = await fetch("/api/getBasketNew",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: userId }),
                }

            );
            const data = await response.json();
            console.log(data);
            setBasket(data.basket);
            console.log(data.basket.items.toString());
        };

        fetchBasket();
    }, [userId]);



    return(

        <div>
            <code>{JSON.stringify(basket, null, 1)}</code>
            {itemDetails.map(item => (
                <div key={item.id} className="flex flex-col items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-32 h-32" />
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                </div>
            ))}
        </div>

    );


}