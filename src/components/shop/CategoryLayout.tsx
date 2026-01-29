"use client";

import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { IoFunnelOutline, IoGridOutline, IoListOutline } from "react-icons/io5";

interface CategoryLayoutProps {
  gender: "men" | "women";
  products: Product[];
  categories: { value: string; label: string }[];
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  gender,
  products,
  categories,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("newest");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by subcategory if selected
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedSubcategory);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedSubcategory, sortBy, products]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters
                ? "fixed inset-0 z-50 bg-white p-8 overflow-y-auto"
                : "hidden"
            } md:block md:w-64 lg:w-72 flex-shrink-0`}
          >
            <div className="flex items-center justify-between mb-8 md:hidden">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 -mr-2"
              >
                <IoFunnelOutline size={24} />
              </button>
            </div>

            <div className="space-y-10">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">
                  Categories
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedSubcategory("all")}
                    className={`block w-full text-left font-medium transition-colors ${
                      selectedSubcategory === "all"
                        ? "text-orange-600"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    All {gender === "men" ? "Men's" : "Women's"} Pieces
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedSubcategory(cat.value)}
                      className={`block w-full text-left font-medium transition-colors ${
                        selectedSubcategory === cat.value
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Placeholder */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">
                  Price Order
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-200 py-2 focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="newest">Latest Collections</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Mobile Apply Button */}
            <div className="mt-12 md:hidden">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500 font-medium">
                  Showing{" "}
                  <span className="text-black">{filteredProducts.length}</span>{" "}
                  results
                </p>
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowFilters(true)}
                  className="md:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                >
                  <IoFunnelOutline size={18} />
                  Filters
                </button>

                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "text-orange-600"
                        : "text-gray-300 hover:text-gray-600"
                    }`}
                  >
                    <IoGridOutline size={22} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "text-orange-600"
                        : "text-gray-300 hover:text-gray-600"
                    }`}
                  >
                    <IoListOutline size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                  : "space-y-12"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-400 italic text-lg">
                  No pieces found in this selection.
                </p>
                <button
                  onClick={() => setSelectedSubcategory("all")}
                  className="mt-4 text-orange-600 font-bold hover:underline"
                >
                  View All Pieces
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;
