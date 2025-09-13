"use client"
import { useFavorites } from "../context/FavoritesContext"
import { useState } from "react"
import ProductModal from "../components/ProductModal"
import { Product } from "../types/product"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites() // Get favorites from context
  const [itemToRemove, setItemToRemove] = useState<number | null>(null) // Track item to remove
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null) // Track product for modal

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(favorites.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = favorites.slice(startIndex, endIndex) // Items for current page

  // Show message if no favorites
  if (favorites.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">No Favorites</h1>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>

      {/* Favorite items grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentItems.map(product => (
          <div key={product.id} className="border rounded p-4 shadow bg-white text-black flex flex-col items-center h-full min-h-[370px]">
            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-2" />
            <h2 className="mt-2 font-semibold text-center">{product.title}</h2>
            <p className="text-green-600 font-bold">${product.price}</p>

            <div className="flex-1 w-full" /> {/* Push buttons to bottom */}
            <div className="flex gap-3 mt-4 w-full justify-center">
              <button
                onClick={() => setSelectedProduct(product)} // Open product modal
                className="px-3 py-2 bg-yellow-900 text-white rounded hover:bg-yellow-800 text-sm"
              >
                View Details
              </button>
              <button
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                onClick={() => setItemToRemove(product.id)} // Open remove confirmation
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-yellow-900 text-white" : "bg-gray-200"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Remove confirmation modal */}
      {itemToRemove !== null && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">Do you want to remove this product from your favorites?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setItemToRemove(null)} // Cancel
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  removeFromFavorites(itemToRemove) // Remove from favorites
                  setItemToRemove(null)
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product details modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
