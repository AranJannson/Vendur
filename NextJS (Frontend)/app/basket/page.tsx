"use client";

import { useUser } from "@stackframe/stack";
import GetBasket from "../components/payment/GetBasket";

export default function Payment() {
  const user = useUser();

  return (
    <div>
      <title>Basket | Vendur</title>
      {user ? (
        <div>
          {/*Welcome to checkout, you are signed in*/}
          <GetBasket />
        </div>
      ) : (
        <div><p>Welcome to your basket, you need to sign in to add items and view them here!</p></div>
      )}
    </div>
  );
}
