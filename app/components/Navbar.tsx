"use client"
import Link from "next/link"
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { getCartItemsCount } = useCart() // Get total items in cart
  const pathname = usePathname() // Get current page path
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Track login state
  const [mounted, setMounted] = useState(false) // Prevent SSR mismatch

  // Check login state on mount
  useEffect(() => {
    setMounted(true) 
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true")

    // Listen to localStorage changes (e.g., in another tab)
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true")
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    setIsLoggedIn(false)
    window.location.href = "/login" // Redirect to login
  }

  // Main navigation links
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About Us" },
  ]

  // Avoid rendering on SSR
  if (!mounted) return null

  return (
    <nav className="backdrop-blur bg-white/70 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-yellow-900/10">
      
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-yellow-900 tracking-wide drop-shadow"
      >
        MyShop
      </Link>

      {/* Navigation links (hidden on small screens) */}
      <div className="hidden md:flex gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative font-semibold transition-colors ${
              pathname === link.href
                ? "text-yellow-900 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-yellow-900"
                : "text-yellow-800 hover:text-yellow-900"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Icons: favorites, cart, login/logout */}
      <div className="flex items-center gap-5">
        {/* Favorites */}
        <Link href="/favorites" className="relative group">
          <FaHeart
            size={22}
            className="text-yellow-900 group-hover:text-yellow-800 transition-colors"
          />
        </Link>

        {/* Cart */}
        <Link href="/cart" className="relative group">
          <FaShoppingCart
            size={22}
            className="text-yellow-900 group-hover:text-yellow-800 transition-colors"
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {getCartItemsCount()}
          </span>
        </Link>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="group" title="Logout">
            <FaSignOutAlt
              size={22}
              className="text-yellow-900 group-hover:text-yellow-800 transition-colors"
            />
          </button>
        ) : (
          <Link href="/login" className="group">
            <FaUser
              size={22}
              className="text-yellow-900 group-hover:text-yellow-800 transition-colors"
            />
          </Link>
        )}
      </div>
    </nav>
  )
}
