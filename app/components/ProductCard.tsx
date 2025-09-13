"use client"
import { useState } from "react"
import { Product } from "../types/product"
import ProductModal from "./ProductModal"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { Heart } from "lucide-react"

export default function ProductCard({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false) // Track if modal is open
  const { addToCart } = useCart() // Function to add item to cart
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites() // Favorite functions

  // Render stars based on product rating
  const renderStars = (rate: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rate) ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      )
    }
    return stars
  }

  // Toggle product favorite
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering parent click
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <>
      {/* Product card container */}
      <div
        className="border rounded p-4 relative bg-white text-black transition transform hover:scale-105 hover:shadow-2xl"
      >
        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:scale-110 transition"
        >
          <Heart
            size={20}
            className={isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </button>

        {/* Product image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 object-contain mx-auto mb-2"
        />

        {/* Product title */}
        <h2 className="text-lg font-semibold mt-2 line-clamp-1">{product.title}</h2>

        {/* Product price */}
        <p className="text-green-600 font-bold">${product.price}</p>

        {/* Rating stars and count */}
        <div className="flex items-center gap-1 text-sm mt-1">
          {renderStars(product.rating.rate)}
          <span className="text-gray-500 ml-1">({product.rating.count})</span>
        </div>

        {/* Add to cart button */}
        <button
          className="mt-3 w-full bg-yellow-900 hover:bg-yellow-800 text-white font-bold py-1 px-2 rounded text-sm transition"
          onClick={e => {
            e.stopPropagation()
            addToCart({
              ...product,
              quantity: 1
            })
          }}
        >
          + Add To Cart
        </button>

        {/* View details button */}
        <button
          className="mt-2 w-full bg-transparent border-2 border-yellow-900 text-yellow-900 hover:bg-yellow-900 hover:text-white font-bold py-1 px-2 rounded text-sm transition"
          onClick={() => setShowModal(true)}
        >
          View Details
        </button>
      </div>

      {/* Product modal */}
      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
