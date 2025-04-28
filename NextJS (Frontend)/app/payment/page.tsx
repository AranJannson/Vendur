"use client";

import { useUser } from "@stackframe/stack";
import GetBasket from "../components/payment/GetBasket";

export default function Payment() {
  const user = useUser();

  return (
    <div>
      {user ? (
        <div>
          Welcome to checkout, you are signed in
          <GetBasket />
        </div>
      ) : (
        <div>Welcome to checkout, you need to sign in to see your basket</div>
      )}
    </div>
  );
}
