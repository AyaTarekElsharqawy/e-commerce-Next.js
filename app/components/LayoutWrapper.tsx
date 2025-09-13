"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() // Get current path

    // Pages where Navbar and Footer should be hidden
    const hideLayout = ["/login", "/signup"].includes(pathname)

    return (
        <>
            {/* Show Navbar only if not in hideLayout pages */}
            {!hideLayout && <Navbar />}

            {/* Main content */}
            <main className="flex-1 flex flex-col">{children}</main>

            {/* Show Footer only if not in hideLayout pages */}
            {!hideLayout && <Footer />}
        </>
    )
}
