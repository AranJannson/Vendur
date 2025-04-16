"use client";

import { useUser } from "@stackframe/stack";
import GetBasket from "../components/payment/GetBasket";
import GetBasketCountdownTimer from "../components/payment/GetBasketCountdownTimer";
import { useState } from "react";

export default function Payment() {

    const user = useUser();
    const [basketLength, setBasketLength] = useState<number>(0);

    return (
        <div> 
        { user? (
            <div>
                Welcome to checkout, you are signed in
                <GetBasket setBasketLength={setBasketLength}/>
                <GetBasketCountdownTimer basketLength={basketLength}/>
            </div>
        ) : (
            <div>
                Welcome to checkout, you need to sign in to see your basket
            </div>
        )}
        </div>
    );
}