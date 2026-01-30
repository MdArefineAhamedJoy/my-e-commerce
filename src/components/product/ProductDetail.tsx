"use client";

import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoAdd,
  IoCartOutline,
  IoChevronBack,
  IoChevronForward,
  IoHeart,
  IoHeartOutline,
  IoRemove,
  IoStar,
} from "react-icons/io5";

import { ProductDetailProps } from "@/types/detail.type";

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setMiniCartOpen,
  } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [mounted]);

  const inWishlist = mounted ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    // Close mini cart if it was auto-opened, and navigate to checkout
    setMiniCartOpen(false);
    router.push("/checkout");
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-gray-50 border border-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={
                      product.images?.[selectedImage] ||
                      "/images/placeholder.png"
                    }
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1,
                    )
                  }
                  className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-white text-black transition-all"
                >
                  <IoChevronBack size={24} />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-white text-black transition-all"
                >
                  <IoChevronForward size={24} />
                </button>
              </div>

              {/* Price Badge on Image */}
              <div className="absolute top-6 left-6 z-10 bg-black text-white px-6 py-2 rounded-full font-bold shadow-xl">
                ৳{product.price}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 aspect-4/5 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-orange-500 scale-95"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-orange-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IoStar
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "fill-current"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pt-0.5">
                  {product.reviewCount || 0} Reviews
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-black tracking-tighter leading-[1.1] mb-8">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-6">
                <span className="text-4xl font-bold text-orange-600">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-300 line-through font-medium">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-gray-500 max-w-xl mb-4 italic">
              {product.description}
            </p>

            {/* Selection Options */}
            <div className="flex flex-col gap-10">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Select Color:{" "}
                    <span className="text-black">{selectedColor}</span>
                  </span>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                          selectedColor === color
                            ? "border-black scale-110"
                            : "border-gray-100 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Select Size:{" "}
                    <span className="text-black">{selectedSize}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 h-12 flex items-center justify-center rounded-xl font-bold text-xs transition-all ${
                          selectedSize === size
                            ? "bg-black text-white shadow-xl scale-105"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Quantity
                </span>
                <div className="flex items-center gap-4 w-fit bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-600"
                  >
                    <IoRemove size={18} />
                  </button>
                  <span className="w-10 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-600"
                  >
                    <IoAdd size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-5 mt-8">
              <motion.button
                whileHover={{ scale: 1.02, translateY: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-3 bg-black text-white py-6 px-10 rounded-2xl font-bold flex items-center justify-center gap-4 shadow-2xl shadow-black/20 hover:bg-orange-600 transition-all duration-500 group"
              >
                <IoCartOutline
                  size={26}
                  className="group-hover:rotate-[-10deg] transition-transform"
                />
                <span className="tracking-tight text-lg">
                  Add to Shopping Bag
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWishlistToggle}
                className={`flex-1 h-20 flex items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                  inWishlist
                    ? "bg-orange-50 border-orange-500 text-orange-500"
                    : "border-gray-100 text-gray-400 hover:border-black hover:text-black"
                }`}
              >
                {inWishlist ? (
                  <IoHeart size={32} />
                ) : (
                  <IoHeartOutline size={32} />
                )}
              </motion.button>
            </div>

            {/* Extra Info */}
            <div className="mt-16 grid grid-cols-2 gap-y-10 gap-x-6 py-12 border-y border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">
                  SKU
                </span>
                <span className="text-xs font-bold text-black">
                  {product.sku}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">
                  Inventory
                </span>
                <span className="text-xs font-bold text-black">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">
                  Category
                </span>
                <span className="text-xs font-bold text-black capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">
                  Available For
                </span>
                <span className="text-xs font-bold text-black capitalize">
                  {product.gender}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
