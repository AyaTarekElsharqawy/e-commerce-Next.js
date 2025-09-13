"use client"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    // Get cart data and functions from context
    const { cartItems, getCartTotal, clearCart } = useCart()

    // Form state
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [submitted, setSubmitted] = useState(false) // Track if form is submitted
    const [errors, setErrors] = useState<{ name?: string; address?: string; phone?: string }>({}) // Validation errors

    const router = useRouter()

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate fields
        const newErrors: typeof errors = {}
        if (!name) newErrors.name = "Name is required"
        if (!address) newErrors.address = "Address is required"
        if (!phone) newErrors.phone = "Phone is required"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors) // Show errors
            return
        }

        // If valid, submit
        setSubmitted(true)
        clearCart() // Clear cart after order

        // Redirect to home after 2.5s
        setTimeout(() => router.push("/"), 2500)
    }

    // If cart is empty and not submitted, show empty message
    if (cartItems.length === 0 && !submitted) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
            </div>
        )
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-yellow-900 mb-6 text-center">Checkout</h1>

                {/* Show thank you message if submitted */}
                {submitted ? (
                    <div className="text-center">
                        <p className="text-green-600 text-xl font-semibold mb-4">Thank you for your order!</p>
                        <p className="text-gray-700">You will be redirected to the home page shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Name input */}
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-yellow-900"}`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Address input */}
                        <div>
                            <input
                                type="text"
                                placeholder="Address"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-yellow-900"}`}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        {/* Phone input */}
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-yellow-900"}`}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Order summary */}
                        <div className="border-t pt-4 mt-2">
                            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                            <ul className="mb-2 text-sm text-gray-700">
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex justify-between">
                                        <span>{item.title} x{item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between font-bold text-yellow-900">
                                <span>Total:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="mt-4 bg-yellow-900 hover:bg-yellow-800 text-white font-bold py-2 rounded transition"
                        >
                            Place Order
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
