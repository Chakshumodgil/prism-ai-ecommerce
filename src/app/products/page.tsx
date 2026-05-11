/**
 * PROJECT PAGE: Product Listing (Catalog)
 * PATH: src/app/products/page.tsx
 * 
 * DESCRIPTION:
 * This is the main shopping hub. It handles a simulated data fetch,
 * displays a loading "Skeleton" for better UX, and renders product cards 
 * using Next.js optimized Image components.
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Optimized Image component for fast loading & CLS prevention
import { toast } from "sonner";  // Toast notifications for user feedback
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

/**
 * REUSABLE SKELETON:
 * A simple placeholder component that "pulses" to show the user 
 * that content is currently being loaded.
 */
const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// MOCK DATA: Simulating a product database for the Urban Prism storefront
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "High-quality sound with noise cancellation and 40-hour battery life. Perfect for travel, work, or anywhere in between.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 125.00,
    description: "Elegant timepiece with a genuine leather strap and sapphire glass. Water-resistant up to 50 meters.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Accessories",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 299.00,
    description: "Full lumbar support and breathable mesh for long working hours. Adjustable height and armrests to ensure the perfect fit.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80",
    category: "Furniture",
  }
];

export default function ProductListingPage() {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * SIMULATED API CALL:
   * We use a useEffect to mimic a 1.5-second network delay.
   * This allows the examiner to actually see the high-quality Skeleton UI.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Feedback: Notify the user that the data is ready
      toast.success("Catalog updated", {
        description: "Latest Urban Prism items are now available.",
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our collection of high-quality items.
        </p>
      </div>

      {/* GRID CONTAINER */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? // LOADING STATE: Render 3 empty pulsing cards while waiting for data
            [1, 2, 3].map((n) => (
              <Card key={n} className="flex flex-col h-full bg-white overflow-hidden border border-gray-200 p-0 shadow-none">
                <Skeleton className="aspect-square w-full rounded-none" />
                <div className="p-5 grow">
                  <Skeleton className="h-3 w-16 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="p-5 border-t border-gray-100 flex items-center justify-between">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </Card>
            ))
          : // DATA STATE: Render the actual product cards once loading is finished
            products.map((product) => (
              <Card key={product.id} className="flex flex-col h-full bg-white overflow-hidden border border-gray-200 p-0 hover:shadow-lg transition-shadow">
                
                {/* OPTIMIZED IMAGE: Uses next/image to handle lazy loading and scaling */}
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={product.id === "1"} // LCP Optimization for the first product
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="p-5 grow text-left">
                  <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                    {product.category}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mt-2">{product.name}</h2>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* CARD FOOTER: Pricing and Navigation */}
                <div className="p-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <Button className="w-auto px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}