"use client"

export default function AboutPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white py-12 px-4">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-3xl flex flex-col md:flex-row gap-10 items-center">
        {/* Images */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <img src="/product-detail-03.jpg" alt="Our Team" className="w-40 h-40 object-cover rounded-lg shadow-md" />
          <img src="/product-05.jpg" alt="Our Store" className="w-40 h-40 object-cover rounded-lg shadow-md" />
        </div>
        {/* Text */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-yellow-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to <span className="font-bold text-yellow-900">MyShop</span>! We are passionate about bringing you the best products at amazing prices. Our team is dedicated to providing a seamless shopping experience, from browsing to checkout.
          </p>
          <p className="text-md text-gray-600 mb-4">
            Our store features a curated selection of fashion, accessories, and more. We believe in quality, value, and customer satisfaction. Thank you for choosing us as your shopping destination!
          </p>
          <div className="flex gap-4 mt-6">
            <img src="/product-detail-01.jpg" alt="Our Values" className="w-24 h-24 object-cover rounded-full shadow" />
            <img src="/product-06.jpg" alt="Customer Service" className="w-24 h-24 object-cover rounded-full shadow" />
          </div>
        </div>
      </div>
    </div>
  )
}
