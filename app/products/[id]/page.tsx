import { getProduct } from "../../lib/api"
export default async function ProductDetails({ params }: { params: { id: string } }) {
    let product = null;
    let error = null;
    try {
        product = await getProduct(String(params.id));
        // If the API returns an empty object or missing fields
        if (!product || !product.id || !product.title) {
            error = "Product not found.";
        }
    } catch (e) {
        error = "Product not found.";
    }

    if (error) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Product Not Found</h1>
                <p className="text-gray-600">The product you are looking for does not exist.</p>
            </div>
        );
    }

    
    return (
        <div className="p-6">
            <img
                src={product!.image}
                alt={product!.title}
                className="w-48 mx-auto"
            />
            <h1 className="text-2xl font-bold mt-4">{product!.title}</h1>
            <p className="text-gray-700 mt-2">${product!.price}</p>
            <p className="mt-4">{product!.description}</p>
            <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                Category: {product!.category} |
                {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={i <= Math.round(product!.rating.rate) ? "text-yellow-400" : "text-gray-300"}>★</span>
                ))}
                <span className="ml-1">({product!.rating.count})</span>
            </div>
        </div>
    )
}
