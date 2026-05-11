/**
 * DYNAMIC PAGE: Product Details
 * Extracts a unique ID from the URL to display specific information for a single item.
 * This serves as the "Product Profile" for Urban Prism.
 */

"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

/**
 * STATIC PRODUCT DATA:
 * In a fully dynamic app, this data would be fetched from an API using the ID.
 * For this project, we use a central array to simulate a catalog.
 */
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "High-quality sound with noise cancellation and 40-hour battery life. Perfect for travel, work, or anywhere in between. Features comfortable over-ear cushions and a sleek matte finish.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 125.00,
    description: "Elegant timepiece with a genuine leather strap and sapphire glass. Water-resistant up to 50 meters. A timeless design that fits both formal and casual occasions.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Accessories",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 299.00,
    description: "Full lumbar support and breathable mesh for long working hours. Adjustable height and armrests to ensure the perfect fit for your desk setup.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80",
    category: "Furniture",
  }
];

export default function ProductDetailsPage() {
  const params = useParams(); // Retrieves the [id] from the current browser URL
  const router = useRouter(); // Enables programmatic navigation

  // LOGIC: Filter the dataset to find the product that matches the URL parameter
  const product = products.find((p) => p.id === params.id);

  // FALLBACK: User-friendly error UI if the ID doesn't exist (e.g., manual URL typing error)
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link href="/products" className="text-blue-500 mt-4 underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Navigation shortcut to return to the previous view */}
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center text-gray-600 hover:text-black transition"
        >
          ← Back to Collection
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          
          {/* VISUALS: Product Image with consistent aspect ratio */}
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* CONTENT: Detailed product information and category badging */}
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-gray-800 mb-8">
              ${product.price.toFixed(2)}
            </p>

            {/* DESCRIPTION SECTION: Structured with borders for a clean retail look */}
            <div className="border-t border-b border-gray-100 py-6 mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
            
            {/* Call-to-action button using the project's reusable Button component */}
            <Button className="py-4 text-lg bg-black text-white hover:bg-gray-800 rounded-lg shadow-md transition-all">
              Add to Shopping Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}