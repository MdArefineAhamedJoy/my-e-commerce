"use client";

import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface CategoryLayoutProps {
  gender: "men" | "women";
  categoryName: string; // e.g., "Pants", "Shirts"
  products: Product[];
}

const ITEMS_PER_PAGE = 3;

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  gender,
  categoryName,
  products,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container py-12">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 capitalize">
              {categoryName}
            </h2>
            <p className="text-gray-500 mt-2">
              Showing {displayedProducts.length} of {products.length} results
            </p>
          </div>

          {/* Simple Sort/Filter indicator or just spacer */}
          <div className="hidden md:block text-sm text-gray-400">
            {gender === "men" ? "Men's" : "Women's"} Collection
          </div>
        </div>

        {/* Product Grid - No Sidebar */}
        <main>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
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
