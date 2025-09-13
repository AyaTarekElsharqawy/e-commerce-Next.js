"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { Product } from "../types/product"

// Define context types
interface FavoritesContextType {
  favorites: Product[]                        // List of favorite products
  addToFavorites: (product: Product) => void  // Add product to favorites
  removeFromFavorites: (id: number) => void   // Remove product from favorites
  isFavorite: (id: number) => boolean         // Check if product is in favorites
}

// Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Hook to use favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

// Provider component to wrap the app
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]) // State for favorite items

  // Add product to favorites
  const addToFavorites = (product: Product) => {
    setFavorites(prev => [...prev, product])
  }

  // Remove product from favorites by id
  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  // Check if a product is already a favorite
  const isFavorite = (id: number) => favorites.some(item => item.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
