"use client";
import { useState, useEffect } from "react";

// Slider data
const slides = [
    { image: "/slide-02.jpg", text: "Welcome to Our Shop" },
    { image: "/slide-03.jpg", text: "Discover Amazing Products" },
    { image: "/slide-04.jpg", text: "Enjoy Great Deals" }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0); // Current slide index
    const [fade, setFade] = useState(true); // Fade animation toggle

    // Go to next slide
    const nextSlide = () => {
        setFade(false); // Start fade-out
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length); // Increment slide
            setFade(true); // Fade-in new slide
        }, 300);
    };

    // Go to previous slide
    const prevSlide = () => {
        setFade(false);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length); // Decrement slide
            setFade(true);
        }, 300);
    };

    // Auto-slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval); // Cleanup on unmount
        // eslint-disable-next-line
    }, []);

    return (
        <div className="relative w-full h-64 md:h-[500px] rounded-lg overflow-hidden">
            
            {/* Previous button */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-brown-900 rounded-full p-2 z-10"
            >
                &#8592;
            </button>

            {/* Slide image */}
            <img
                src={slides[current].image}
                alt="Hero Slide"
                className={`w-full h-full object-top object-cover transition-all duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Slide text */}
            <div className="absolute inset-0 flex items-center justify-start p-6 md:p-16">
                <div className={`text-left max-w-lg transition-all duration-700 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h1 className="text-3xl md:text-5xl font-bold text-yellow-900 drop-shadow">
                        {slides[current].text}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-brown-800 font-medium">
                        Explore the best products with us
                    </p>
                    <a
                        href="/products"
                        className="mt-6 inline-block px-6 py-2 bg-yellow-900 text-white rounded-lg shadow hover:bg-yellow-800 transition"
                    >
                        See More
                    </a>
                </div>
            </div>

            {/* Next button */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-brown-900 rounded-full p-2 z-10"
            >
                &#8594;
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-900' : 'bg-white'} border border-yellow-700`}
                    ></span>
                ))}
            </div>
        </div>
    );
}
