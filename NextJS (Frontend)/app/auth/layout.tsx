import AuthPageWrapper from "@/app/components/auth/AuthPageWrapper";
import "../globals.scss";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import {stackServerApp} from "@/stack";
import {StackProvider, StackTheme} from "@stackframe/stack";

export const metadata = {
    title: "Sign Up | Vendur",
    description: "",
};

export default function AuthLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <StackProvider app={stackServerApp}><StackTheme>
                <AuthPageWrapper>
                    {children}
                </AuthPageWrapper>
        </StackTheme></StackProvider>
    );
}
