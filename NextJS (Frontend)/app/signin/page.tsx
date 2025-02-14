'use client'
import SignIn from "@/app/components/auth/SignIn"
import {useUser} from "@stackframe/stack";
import {useRouter} from "next/navigation";

export default function SignInPage() {
        const user = useUser();
  //   Redirect if user is already signed in
    if (user) {
        //  Redirect to home page
        const router = useRouter();
        router.push('/');
    }
    return (
        // Customise However
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    )
}