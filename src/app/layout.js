"use client";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import WhatsApp from "@/components/Whatsapp";
import { AuthProvider } from "@/context/authContext";
import { useEffect, useState } from "react";
import "../globals.css";


export default function RootLayout({ children }) {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

useEffect(() => {
  if (typeof window !== "undefined") {
    setIsAdminRoute(window.location.pathname.startsWith("/admin"));
  }
}, []);  
 

  return (
    <html lang="en">
      <body className="pt-0">
        <AuthProvider>
        {!isAdminRoute && <Navigation />}
        {children} 
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsApp/>}
        </AuthProvider>
      </body>
    </html>
  );
}
