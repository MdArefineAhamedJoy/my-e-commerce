"use client";

import { useStore } from "@/lib/store";
import { WishlistItem } from "@/types/wishlist.type";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoBagOutline,
  IoCloseOutline,
  IoHeartOutline,
  IoTrashOutline,
} from "react-icons/io5";

const WishlistModal: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setWishlistOpen,
    setMiniCartOpen,
    removeFromWishlist,
    addToCart,
  } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [mounted]);

  if (!mounted) return null;

  const handleBuyNow = (item: WishlistItem) => {
    // Add to cart with default size/color
    addToCart(
      item.product,
      item.product.sizes?.[0] || "M",
      item.product.colors?.[0],
      1,
    );
    setWishlistOpen(false);
    setMiniCartOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-101 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IoHeartOutline size={22} className="text-orange-600" />
                <h2 className="text-xl font-bold tracking-tight">Wishlist</h2>
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                  {wishlist.length} Items
                </span>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <IoCloseOutline size={28} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <IoHeartOutline size={32} className="text-gray-200" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">No Saved Items</h3>
                  <p className="text-sm text-gray-400 font-medium">
                    Start exploring our collection and save pieces you love.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-4 group"
                    >
                      <div
                        className="relative w-24 h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0 cursor-pointer"
                        onClick={() => {
                          setWishlistOpen(false);
                          router.push(`/product/${item.product.slug}`);
                        }}
                      >
                        <Image
                          src={
                            item.product.images?.[0] ||
                            "/images/placeholder.png"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <h4
                          className="font-bold text-sm truncate cursor-pointer hover:text-orange-600 transition-colors"
                          onClick={() => {
                            setWishlistOpen(false);
                            router.push(`/product/${item.product.slug}`);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                          {item.product.category}
                        </p>
                        <div className="text-sm font-bold text-orange-600 mt-2">
                          ৳{item.product.price}
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => handleBuyNow(item)}
                            className="flex-1 bg-black text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                          >
                            <IoBagOutline size={14} />
                            Buy Now
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.product.id)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                            title="Remove"
                          >
                            <IoTrashOutline size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    setWishlistOpen(false);
                    router.push("/shop");
                  }}
                  className="w-full py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistModal;
