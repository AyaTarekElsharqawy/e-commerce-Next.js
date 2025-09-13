"use client"
import HeroSlider from "../app/components/HeroSlider"
import ProductCard from "../app/components/ProductCard"
import { getProducts } from "../app/lib/api"
import { useRef, useEffect, useState } from "react"
import { Product } from "../app/types/product"
import Link from "next/link"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  const scrollByAmount = 270
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" })
    }
  }
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/banner-04.jpg"
              alt="Women"
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-black/40 w-full text-left">
              <h3 className="text-white text-xl font-bold">Women</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/banner-05.jpg"
              alt="Men"
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-black/40 w-full text-left">
              <h3 className="text-white text-xl font-bold">Men</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/banner-06.jpg"
              alt="Accessories"
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-black/40 w-full text-left">
              <h3 className="text-white text-xl font-bold">Accessories</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Product Overview</h2>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto overflow-visible gap-6 pb-4 pt-4 mt-6 scrollbar-hide min-h-[340px]"
          >
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="min-w-[250px] max-w-[250px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-yellow-900 rounded-full p-2 shadow z-10"
          >
            &#8592;
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-yellow-900 rounded-full p-2 shadow z-10"
          >
            &#8594;
          </button>
        </div>

       <div className="text-center mt-8">
  <Link
    href="/products"
    className="bg-yellow-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition"
  >
    See More
  </Link>
</div>
      </section>
    </>
  )
}
