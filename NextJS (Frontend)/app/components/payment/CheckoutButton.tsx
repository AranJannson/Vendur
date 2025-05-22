'use client';

import {useUser} from "@stackframe/stack";

export default function CheckoutButton({ handleClick } : { handleClick: () => void }) {
    const user = useUser()

    if (!user) {
        return (
            <a href="/login">
                <button
                    className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                    Sign in to Checkout
                </button>
            </a>
        );
    }

    return (
        // <a href="/basket/checkout">
            <button
                onClick={handleClick}
                className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                Go to Checkout
            </button>
        // </a>
    );
}