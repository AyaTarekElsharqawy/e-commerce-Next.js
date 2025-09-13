"use client"
import { useState } from "react"

// SearchBar component receives an onSearch function as prop
export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState(""); // Track input value

    return (
        // Form to handle search submission
        <form
            onSubmit={e => {
                e.preventDefault(); // Prevent page reload
                onSearch(query); // Call parent function with query
            }}
            className="flex items-center gap-2 mb-6"
        >
            {/* Search input */}
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={e => setQuery(e.target.value)} // Update input state
                className="flex-1 px-4 py-2 border border-yellow-900/30 rounded focus:outline-none focus:ring-2 focus:ring-yellow-800 bg-white/80"
            />
            {/* Submit button */}
            <button
                type="submit"
                className="bg-yellow-900 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded transition"
            >
                Search
            </button>
        </form>
    );
}
