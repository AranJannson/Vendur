"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const address = elements.getElement(AddressElement);
    const addressDetails = await address?.getValue();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment/checkout/success",
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

      window.location.href = "http://localhost:3000/payment/checkout/success";
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
