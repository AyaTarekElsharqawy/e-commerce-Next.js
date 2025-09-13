"use client"
import { useState } from "react"
import { Product } from "../types/product"
import { useCart } from "../context/CartContext"

interface ProductModalProps {
    product: Product
    onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [selectedSize, setSelectedSize] = useState("") // Track selected size
    const [selectedColor, setSelectedColor] = useState("") // Track selected color
    const [quantity, setQuantity] = useState(1) // Track product quantity
    const { addToCart } = useCart() // Add product to cart

    // Add product to cart with selected options
    const handleAddToCart = () => {
        const productWithOptions = {
            ...product,
            selectedSize,
            selectedColor,
            quantity
        }
        addToCart(productWithOptions)
        onClose() // Close modal
    }

    return (
        // Modal background
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

            {/* Modal container */}
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
                
                {/* Modal header */}
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Product image */}
                    <div className="md:w-1/2">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-64 object-contain mx-auto"
                        />
                    </div>

                    {/* Product details */}
                    <div className="md:w-1/2">
                        <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        {/* Quantity selector */}
                        <div className="flex items-center mb-6">
                            <label className="block text-sm font-medium text-gray-700 mr-4">Quantity</label>
                            <div className="flex items-center border rounded">
                                <button
                                    className="px-3 py-1 text-lg"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="px-3 py-1">{quantity}</span>
                                <button
                                    className="px-3 py-1 text-lg"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to cart button */}
                        <button
                            className="w-full bg-yellow-900 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded transition"
                            onClick={handleAddToCart}
                        >
                            ADD TO CART
                        </button>

                        {/* Product rating */}
                        <div className="mt-4 flex items-center">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className={i <= Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}>★</span>
                            ))}
                            <span className="ml-2 text-gray-600 text-sm">({product.rating.count} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
