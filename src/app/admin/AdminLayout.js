
"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
    const { isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) {
            router.push("/admin/login");
        }
    }, [isAdmin, router]);

    if (!isAdmin) return null; // Prevent rendering if not authenticated

    return (
        <div className="flex admin-layout">
            <AdminSidebar/>
            <div className="flex-1 py-12">
            {children} 
            </div>
        </div>
    );
}
