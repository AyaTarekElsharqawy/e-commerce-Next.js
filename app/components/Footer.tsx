"use client"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-yellow-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">MyShop</h3>
          <p>
            Your one-stop shop for the best products at amazing prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/products" className="hover:text-yellow-400 transition">Shop</a></li>
            <li><a href="/about" className="hover:text-yellow-400 transition">About Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p> 123 Main Street, Cairo, Egypt</p>
          <p> +20 111 222 3333</p>
          <p> myshop@gmail.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-400 transition"><Facebook size={24} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Instagram size={24} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Twitter size={24} /></a>
          </div>
        </div>

      </div>
    
    </footer>
  )
}
