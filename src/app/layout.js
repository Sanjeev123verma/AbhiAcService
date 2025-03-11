"use client";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/context/authContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "../globals.css";
import Head from "next/head";
import { SpeedInsights } from '@vercel/speed-insights/next';


const WhatsApp = dynamic(() => import("@/components/Whatsapp"), { ssr: false });

export default function RootLayout({ children }) {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdminRoute(window.location.pathname.startsWith("/admin"));
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
        <title>Abhi AC Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="pt-0">
        <AuthProvider>
          {!isAdminRoute && <Navigation />}
          <main className="flex-grow">{children}</main>
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <WhatsApp />}
          <SpeedInsights/>
        </AuthProvider>
      </body>
    </html>
  );
}
