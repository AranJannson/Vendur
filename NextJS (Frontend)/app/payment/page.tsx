"use client";
import { useUser } from "@stackframe/stack";

export default function Payment() {

    const user = useUser();

    return (
        <div> 
        { user? (
            <div>
                Welcome to checkout, you are signed in
            </div>
        ) : (
            <div>
                Welcome to checkout, you need to sign in to see your basket
            </div>
        )}
        </div>
    );
}