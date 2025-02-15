import AuthPageWrapper from "@/app/components/auth/AuthPageWrapper";
import "../globals.scss";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import {stackServerApp} from "@/stack";
import {StackProvider, StackTheme} from "@stackframe/stack";


export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
            <StackProvider app={stackServerApp}><StackTheme>
                <Header/>
                    <AuthPageWrapper>
                        {children}
                    </AuthPageWrapper>
                <Footer/>
            </StackTheme></StackProvider>
            </body>
        </html>
    );
}
