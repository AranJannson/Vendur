"use client";

import { useUser } from "@stackframe/stack";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

export const CheckoutForm = ({basket, amount}: {basket: Item[], amount: number}) => {
  
  const user = useUser();

  const stripe = useStripe();
  const elements = useElements();
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const addressElement = elements.getElement(AddressElement);
    const addressDetails = await addressElement?.getValue();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/basket/checkout/success",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } else {

      await fetch("http://localhost:8002/deletecookie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const deliveryAddress = addressDetails?.value.address;
      const fullName = addressDetails?.value.name;

      await fetch("http://localhost:8002/orderProcessing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          basket: basket,
          user_id: user?.id,
          total_cost: amount,
          delivery_address: deliveryAddress,
          full_name: fullName,
        })
      });

      window.location.href = "http://localhost:3000/basket/checkout/success";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {detailsLoading && <p>Loading Details...</p>}
      <div className={detailsLoading ? "invisible": "visible"}>
        <PaymentElement onReady={() => setDetailsLoading(false)}/>
        <AddressElement options={{mode: 'shipping'}}/>
        <button
          disabled={!stripe || !elements}
          className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4"
        >
          Pay
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </form>
  );
};