"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoHeartDislikeOutline } from "react-icons/io5";

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (productId: string) => {
    const item = wishlist.find((w) => w.product.id === productId);
    if (item) {
      const firstSize = item.product.sizes[0];
      addToCart(item.product, firstSize);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">
            Save your favorite items here for later
          </p>
          <Link href="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
        <p className="text-gray-600">{wishlist.length} items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item, index) => (
          <motion.div
            key={item.product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm border overflow-hidden group"
          >
            {/* Product Image */}
            <Link href={`/shop/${item.product.slug}`}>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {item.product.tags.includes("new-arrival") && (
                    <Badge variant="success" size="sm">
                      New
                    </Badge>
                  )}
                  {item.product.originalPrice && (
                    <Badge variant="error" size="sm">
                      Sale
                    </Badge>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(item.product.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                >
                  <IoHeartDislikeOutline size={20} className="text-red-500" />
                </button>

                {/* Out of Stock Overlay */}
                {item.product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="error">Out of Stock</Badge>
                  </div>
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <Link href={`/shop/${item.product.slug}`}>
                <h3 className="font-semibold text-base mb-1 line-clamp-1 hover:text-orange-500 transition-colors">
                  {item.product.name}
                </h3>
              </Link>

              <p className="text-sm text-gray-600 capitalize mb-2">
                {item.product.category}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">
                  {item.product.price} BDT
                </span>
                {item.product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {item.product.originalPrice} BDT
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                fullWidth
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(item.product.id);
                }}
                disabled={item.product.stock === 0}
                icon={<IoCartOutline size={18} />}
              >
                {item.product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
