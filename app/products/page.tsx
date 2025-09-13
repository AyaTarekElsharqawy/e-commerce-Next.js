"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { Product } from "../types/product";

const PAGE_SIZE = 6;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
    if (!q) setFiltered(products);
    else
      setFiltered(
        products.filter((p) =>
          p.title.toLowerCase().includes(q.toLowerCase())
        )
      );
  };

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-900">
        Products
      </h1>

      {/* Search + count */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <SearchBar onSearch={handleSearch} />
        <span className="text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} products
        </span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-yellow-900 font-bold">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-yellow-900 font-bold">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              className="px-4 py-2 rounded bg-yellow-900 text-white font-bold disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded font-bold border-2 transition ${
                  page === i + 1
                    ? "bg-yellow-900 text-white border-yellow-900"
                    : "bg-white text-yellow-900 border-yellow-900 hover:bg-yellow-100"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 rounded bg-yellow-900 text-white font-bold disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
