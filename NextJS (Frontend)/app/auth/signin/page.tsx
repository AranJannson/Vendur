'use client'
import SignIn from "@/app/components/auth/SignIn"
import {useUser} from "@stackframe/stack";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {AnimatePresence} from "motion/react";
import {motion} from "motion/react";
import AuthPageWrapper from "@/app/components/auth/AuthPageWrapper";

// const variants = {
//     animate: {
//         y: ['0%', '10%', '0%'],  // Reversed y movement
//         scale: 0.8,
//     },
//     transition: {
//         duration: 3,
//         repeat: Infinity,
//         repeatType: 'loop',
//         ease: 'easeInOut',
//         delay: Math.random() * 2,
//     },
// };

export default function SignInPage() {
        const user = useUser();
    if (user) {
        const router = useRouter();
        router.push('/');
    }
    return (
            <SignIn />
    )
}