'use client'

import { useUser } from "@stackframe/stack"
import {useEffect, useState} from "react";


interface Basket{

    user_id: string,
    created_at: Date,
    items: number[],
    quantities: number[]

}

export default function GetBasket() {

    const userId = useUser()?.id
    
    const [basket, setBasket] = useState<Basket>();
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
    }, []);




    return(

        <div>
            <code>{JSON.stringify(basket)}</code>
        </div>

    );


}