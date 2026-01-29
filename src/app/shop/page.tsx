"use client";

import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { IoFunnelOutline, IoGridOutline, IoListOutline } from "react-icons/io5";

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...MOCK_PRODUCTS];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag)),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

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
      case "newest":
      default:
        // Already in newest order
        break;
    }

    return filtered;
  }, [selectedCategory, selectedTags, priceRange, sortBy]);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "shirt", label: "Shirts" },
    { value: "pant", label: "Pants" },
  ];

  const tags = [
    { value: "new-arrival", label: "New Arrivals" },
    { value: "trending", label: "Trending" },
    { value: "bestseller", label: "Best Sellers" },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop</h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden p-2 border rounded-lg flex items-center gap-2"
        >
          <IoFunnelOutline size={20} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } md:block space-y-6 md:col-span-1`}
        >
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Collections</h3>
            <div className="space-y-2">
              {tags.map((tag) => (
                <label
                  key={tag.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.value)}
                    onChange={() => toggleTag(tag.value)}
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span>{tag.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0 BDT</span>
                <span>{priceRange[1]} BDT</span>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedTags([]);
              setPriceRange([0, 5000]);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-2 border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <IoGridOutline size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <IoListOutline size={20} />
              </button>
            </div>
          </div>

          {/* Products Display */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">
                No products found matching your filters
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedTags([]);
                  setPriceRange([0, 5000]);
                }}
                className="text-orange-500 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
