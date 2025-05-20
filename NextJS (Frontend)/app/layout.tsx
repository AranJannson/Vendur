import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import Providers from "@/app/components/global/Providers";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import ClickTrackerWrapper from "@/app/components/wrappers/ClickTrackerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vendur",
  description: "Your one-stop shop for everything you need. Providing ease, and convenience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackServerApp}>
          <Providers>
      <StackTheme>
          <ClickTrackerWrapper>
              <Header/>
              {children}
              <Footer/>
          </ClickTrackerWrapper>
        </StackTheme>
              </Providers>
      </StackProvider></body>
    </html>
  );
}
