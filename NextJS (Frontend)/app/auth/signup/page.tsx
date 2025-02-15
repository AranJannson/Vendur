"use client";
import SignUp from "@/app/components/auth/SignUp";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const user = useUser();
  //   Redirect if user is already signed in
    if (user) {
        //  Redirect to home page
        const router = useRouter();
        router.push('/');
    }
  return (
        <SignUp />
  )
}