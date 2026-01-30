"use client";

import ProductCard from "@/components/product/ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { CategoryLayoutProps } from "@/types/category.type";

const ITEMS_PER_PAGE = 16;

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  gender,
  categoryName,
  products,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [internalSortBy, setInternalSortBy] = useState<string>("newest");
  const [isPricePopoverOpen, setIsPricePopoverOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState({ min: "", max: "" });

  // Combined Filtering Logic
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (localSearchQuery) {
      const q = localSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    if (localPriceRange.min) {
      filtered = filtered.filter(
        (p) => p.price >= parseInt(localPriceRange.min),
      );
    }
    if (localPriceRange.max) {
      filtered = filtered.filter(
        (p) => p.price <= parseInt(localPriceRange.max),
      );
    }

    switch (internalSortBy) {
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
  }, [products, localSearchQuery, internalSortBy, localPriceRange]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container py-8">
        {/* Header Section - Refined & Minimalist (Reduced Height feel) */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
            <Link
              href={`/${gender}`}
              className="hover:text-black transition-colors"
            >
              Back to {gender === "men" ? "Men" : "Women"}
            </Link>
            <span className="text-gray-200">/</span>
            <span className="text-black">{categoryName}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-medium text-black tracking-tighter leading-none mb-4 capitalize">
            {categoryName}
            <span className="text-orange-600">.</span>
          </h2>
          <div className="h-px w-12 bg-black mx-auto" />
        </div>

        {/* Discovery Bar for Category Pages - Improved Contrast */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-y border-gray-100 py-4">
          <div className="relative group w-full md:w-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder={`Find in ${categoryName}...`}
              value={localSearchQuery}
              onChange={(e) => {
                setLocalSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-100 border border-gray-200 rounded-full pl-10 pr-6 py-2.5 text-[11px] text-black focus:ring-1 focus:ring-black/10 focus:bg-white placeholder:text-gray-400 font-medium transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Price Filter Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsPricePopoverOpen(!isPricePopoverOpen)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  isPricePopoverOpen ||
                  localPriceRange.min ||
                  localPriceRange.max
                    ? "bg-black text-white shadow-lg shadow-black/10"
                    : "bg-gray-50 text-gray-400 hover:text-black border border-gray-100"
                }`}
              >
                Price
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {isPricePopoverOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsPricePopoverOpen(false)}
                      className="fixed inset-0 z-30"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl p-5 z-40"
                    >
                      <div className="flex flex-col gap-4 text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
                          Archive Price Range
                        </span>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            placeholder="Min"
                            value={localPriceRange.min}
                            onChange={(e) => {
                              setLocalPriceRange((prev) => ({
                                ...prev,
                                min: e.target.value,
                              }));
                              setCurrentPage(1);
                            }}
                            className="text-black w-full bg-gray-50/50 border border-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-black/10"
                          />
                          <div className="h-px w-2 bg-gray-200" />
                          <input
                            type="number"
                            placeholder="Max"
                            value={localPriceRange.max}
                            onChange={(e) => {
                              setLocalPriceRange((prev) => ({
                                ...prev,
                                max: e.target.value,
                              }));
                              setCurrentPage(1);
                            }}
                            className="text-black w-full bg-gray-50/50 border border-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-black/10"
                          />
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-50">
                          <button
                            onClick={() => {
                              setLocalPriceRange({ min: "", max: "" });
                              setIsPricePopoverOpen(false);
                              setCurrentPage(1);
                            }}
                            className="text-[9px] font-black uppercase tracking-tighter text-gray-400 hover:text-orange-600 transition-colors"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => setIsPricePopoverOpen(false)}
                            className="bg-black text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-gray-900 transition-colors shadow-lg shadow-black/5"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-px bg-gray-200 hidden md:block" />

            <div className="flex bg-gray-50 rounded-full p-1 border border-gray-100">
              {[
                { id: "newest", label: "New" },
                { id: "price-low", label: "Value" },
                { id: "price-high", label: "Luxury" },
              ].map((sort) => (
                <button
                  key={sort.id}
                  onClick={() => setInternalSortBy(sort.id)}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all ${
                    internalSortBy === sort.id
                      ? "bg-black text-white shadow-lg shadow-black/10"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden lg:block">
              {filteredProducts.length} Pieces
            </span>
          </div>
        </div>

        {/* Product Grid with Enhanced Vertical Spacing */}
        <main className="py-16 md:py-24">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {displayedProducts.map((product, index) => (
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all"
                  >
                    <IoChevronBack size={20} />
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                            currentPage === page
                              ? "bg-orange-600 text-white shadow-lg"
                              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all"
                  >
                    <IoChevronForward size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-400 italic text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryLayout;
