"use client";

import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { AnimatePresence, motion } from "framer-motion";
import { use, useEffect, useMemo, useState } from "react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    gender?: string;
    tag?: string;
    priceMax?: string;
  }>;
}

const ITEMS_PER_PAGE = 16;

export default function ShopPage({ searchParams }: ShopPageProps) {
  const params = use(searchParams);
  const { category, gender, tag, priceMax } = params;

  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [internalSortBy, setInternalSortBy] = useState<string>("newest");
  const [isPricePopoverOpen, setIsPricePopoverOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState({ min: "", max: "" });

  // Sync scroll on page change
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  }, [currentPage]);

  // Combined Strict & Internal Filter Logic
  const filteredProducts = useMemo(() => {
    let filtered = [...MOCK_PRODUCTS];

    // 1. URL Parameter Filters (Strict)
    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }
    if (gender) {
      filtered = filtered.filter(
        (p) => p.gender.toLowerCase() === gender.toLowerCase(),
      );
    }
    if (tag) {
      filtered = filtered.filter((p) => p.tags?.includes(tag));
    }
    if (priceMax) {
      filtered = filtered.filter((p) => p.price <= parseInt(priceMax));
    }

    // 2. Internal Discovery Filters (Local)
    if (localSearchQuery) {
      const q = localSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // 3. Local Price Range Filter
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

    // 4. Internal Sorting
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
        // Already sorted by newest in mock data usually
        break;
    }

    return filtered;
  }, [
    category,
    gender,
    tag,
    priceMax,
    localSearchQuery,
    internalSortBy,
    localPriceRange,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const viewTitle = useMemo(() => {
    if (category) {
      const catName = category.charAt(0).toUpperCase() + category.slice(1);
      if (gender)
        return `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s ${catName}`;
      return `${catName} Collection`;
    }
    if (gender)
      return `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection`;
    if (tag)
      return tag
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    return "The Archive";
  }, [category, gender, tag]);

  return (
    <div
      className="bg-white min-h-screen selection:bg-black selection:text-white"
      style={{ paddingTop: "var(--header-height, 80px)" }}
    >
      {/* Cinematic Hero Header - Reduced Height */}
      <section className="relative h-[20vh] md:h-[25vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            key={viewTitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-orange-600 mb-3 block">
              Archive Selection
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-medium text-black tracking-tighter leading-none mb-4">
              {viewTitle}
              <span className="text-orange-600">.</span>
            </h1>
            <div className="h-px w-12 bg-black mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Cinematic Discovery Bar */}
      <div className="sticky top-(--header-height,80px) z-30 bg-white/95 backdrop-blur-md border-y border-gray-100 transition-all duration-300">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative group w-full md:w-96">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors"
              width="18"
              height="18"
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
              placeholder={`Search pieces in ${viewTitle}...`}
              value={localSearchQuery}
              onChange={(e) => {
                setLocalSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-100 border border-gray-200 rounded-full pl-12 pr-6 py-3 text-xs text-black focus:ring-1 focus:ring-black/10 focus:bg-white placeholder:text-gray-400 font-medium transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
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
                  width="12"
                  height="12"
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
                    {/* Backdrop for closing popover */}
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
                      <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
                          Price Range (USD)
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

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Sort
              </span>
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
            </div>

            <div className="h-4 w-px bg-gray-200 hidden md:block" />

            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {filteredProducts.length}{" "}
              <span className="text-gray-300">Items</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="container pb-20 md:pb-32">
        {/* Cinematic Grid with Enhanced Vertical Spacing */}
        <div className="min-h-[60vh] py-16 md:py-24">
          <AnimatePresence mode="wait">
            {paginatedProducts.length > 0 ? (
              <motion.div
                key={`${category}-${gender}-${tag}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
              >
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: (index % 4) * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-40 text-center"
              >
                <div className="w-16 h-px bg-gray-200 mb-8" />
                <p className="text-3xl font-serif italic text-gray-300 mb-8 tracking-tighter">
                  No pieces found in this archive selection.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimalist Pagination */}
        {totalPages > 1 && (
          <div className="mt-32 flex justify-center items-center gap-6">
            <div className="h-px w-12 md:w-24 bg-gray-100 shrink-0" />
            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                      currentPage === page
                        ? "bg-black text-white scale-110 shadow-xl shadow-black/10"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {String(page).padStart(2, "0")}
                  </button>
                ),
              )}
            </div>
            <div className="h-[1px] w-12 md:w-24 bg-gray-100 shrink-0" />
          </div>
        )}
      </section>

      {/* Cinematic Quote Footer Break */}
      <section className="bg-black py-40 text-center overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[150px] font-black text-white/5 opacity-20 pointer-events-none uppercase">
          Archive
        </div>
        <div className="container relative z-10">
          <p className="text-white text-2xl md:text-4xl font-serif italic max-w-3xl mx-auto leading-relaxed opacity-90">
            &ldquo;Style is a way to say who you are{" "}
            <br className="hidden md:block" /> without having to speak.&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}
