"use client"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  // Get cart data and functions from the Cart context
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [itemToRemove, setItemToRemove] = useState<number | null>(null) // Store the item id to remove
  const router = useRouter()

  // If the cart is empty, show a message
  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    )
  }

  // Handle checkout button click
  const handleCheckout = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true"
    if (!loggedIn) {
      router.push("/login") // Redirect to login if not logged in
    } else {
       router.push("/checkout") // Redirect to checkout if logged in
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart items list */}
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Item info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>

            {/* Quantity controls and remove button */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button
                  className="px-2"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="px-2"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="text-red-500 hover:underline"
                onClick={() => setItemToRemove(item.id)} // Set item id to show confirmation
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and checkout button */}
      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">
          Total: ${getCartTotal().toFixed(2)}
        </h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>

      {/* Confirmation modal */}
      {itemToRemove !== null && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Do you really want to remove this item from your cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setItemToRemove(null)} // Cancel removal
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  removeFromCart(itemToRemove) // Remove the item
                  setItemToRemove(null) // Close modal
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
