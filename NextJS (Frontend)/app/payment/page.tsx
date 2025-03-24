"use client";

import { useUser } from "@stackframe/stack";
import GetBasket from "../components/payment/GetBasket";
import GetBasketCountdownTimer from "../components/payment/GetBasketCountdownTimer";

export default function Payment() {

    const user = useUser();

    return (
        <div> 
        { user? (
            <div>
                Welcome to checkout, you are signed in
                <GetBasket />
                <GetBasketCountdownTimer />
            </div>
        ) : (
            <div>
                Welcome to checkout, you need to sign in to see your basket
            </div>
        )}
        </div>
    );
}