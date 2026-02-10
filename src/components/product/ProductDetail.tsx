"use client";

import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoAdd,
  IoChevronBack,
  IoChevronForward,
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
    setMiniCartOpen(false);
    router.push("/cart");
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
            <div className="relative aspect-4/5 overflow-hidden bg-[#fafafa] border border-[#eeeeee]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
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

              {/* Navigation Arrows - Minimalist */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1,
                    )
                  }
                  className="w-12 h-12 flex items-center justify-center bg-white border border-[#eeeeee] text-black hover:bg-black hover:text-white transition-all"
                >
                  <IoChevronBack size={20} />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="w-12 h-12 flex items-center justify-center bg-white border border-[#eeeeee] text-black hover:bg-black hover:text-white transition-all"
                >
                  <IoChevronForward size={20} />
                </button>
              </div>

              {/* Price Badge - Moda Style */}
              <div className="absolute top-0 right-0 z-10 bg-[#1c1c1c] text-white px-6 py-3 font-serif italic text-lg shadow-sm">
                Tk {product.price.toLocaleString()}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 aspect-4/5 flex-shrink-0 overflow-hidden border transition-all ${
                    selectedImage === index
                      ? "border-[#1c1c1c]"
                      : "border-[#eeeeee] opacity-60 hover:opacity-100"
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
            <div className="mb-12 border-b border-[#eeeeee] pb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-[#1c1c1c] gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IoStar
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "fill-current"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pt-0.5">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-normal text-[#1c1c1c] leading-[1.1] mb-8">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-6">
                <span className="text-3xl font-serif text-[#1c1c1c]">
                  Tk {product.price.toLocaleString()}.00
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-300 line-through font-serif italic">
                    Tk {product.originalPrice.toLocaleString()}.00
                  </span>
                )}
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-gray-600 mb-12">
              {product.description}
            </p>

            {/* Selection Options */}
            <div className="flex flex-col gap-12">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex flex-col gap-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1c1c1c]">
                    color:{" "}
                    <span className="font-serif italic capitalize ml-1">
                      {selectedColor}
                    </span>
                  </span>
                  <div className="flex gap-4">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border p-1 transition-all ${
                          selectedColor === color
                            ? "border-[#1c1c1c] scale-110"
                            : "border-[#eeeeee] opacity-60 hover:opacity-100"
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
                <div className="flex flex-col gap-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1c1c1c]">
                    size:{" "}
                    <span className="font-serif italic uppercase ml-1">
                      {selectedSize}
                    </span>
                  </span>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] h-12 flex items-center justify-center border text-[12px] font-bold transition-all ${
                          selectedSize === size
                            ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                            : "bg-white text-[#1c1c1c] border-[#eeeeee] hover:border-[#1c1c1c]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex flex-col gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1c1c1c]">
                  quantity
                </span>
                <div className="flex items-center border border-[#eeeeee] w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-[#1c1c1c]"
                  >
                    <IoRemove size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-[14px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-[#1c1c1c]"
                  >
                    <IoAdd size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-16">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#1c1c1c] text-white py-6 text-[13px] font-black uppercase tracking-[0.3em] hover:bg-[#333333] transition-colors"
              >
                Add to Shopping Bag
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`w-full py-6 text-[13px] font-black uppercase tracking-[0.3em] border transition-all ${
                  inWishlist
                    ? "bg-[#fafafa] border-[#1c1c1c] text-[#1c1c1c]"
                    : "border-[#eeeeee] text-gray-400 hover:border-[#1c1c1c] hover:text-[#1c1c1c]"
                }`}
              >
                {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Extra Info - Minimalist Grid */}
            <div className="mt-20 border-t border-[#eeeeee] pt-12 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    sku
                  </span>
                  <p className="text-[13px] font-medium text-[#1c1c1c]">
                    {product.sku}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    inventory
                  </span>
                  <p className="text-[13px] font-medium text-[#1c1c1c]">
                    {product.stock > 0
                      ? `${product.stock} Units left`
                      : "Out of stock"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    category
                  </span>
                  <p className="text-[13px] font-medium text-[#1c1c1c] capitalize">
                    {product.category}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    collection
                  </span>
                  <p className="text-[13px] font-medium text-[#1c1c1c] capitalize">
                    {product.gender}&apos;s Editorial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
