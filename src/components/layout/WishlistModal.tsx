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
    if (isWishlistOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const header = document.querySelector("header");
      if (header) {
        header.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      document.body.style.paddingRight = "0px";

      const header = document.querySelector("header");
      if (header) {
        header.style.paddingRight = "0px";
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      const header = document.querySelector("header");
      if (header) {
        header.style.paddingRight = "0px";
      }
    };
  }, [isWishlistOpen]);

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
            className="fixed inset-0 bg-black/5 z-100"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md lg:max-w-sm bg-white shadow-[-10px_0_50px_rgba(0,0,0,0.1)] z-101 flex flex-col rounded-l-[1rem] border-l border-gray-100"
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
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300"
                    >
                      <div
                        className="relative w-20 h-28 rounded-xl overflow-hidden bg-gray-50 shrink-0 cursor-pointer ring-1 ring-gray-100"
                        onClick={() => {
                          setWishlistOpen(false);
                          router.push(`/shop/${item.product.slug}`);
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

                      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                        <div>
                          <h4
                            className="font-extrabold text-sm text-gray-900 leading-snug truncate cursor-pointer hover:text-orange-600 transition-colors"
                            onClick={() => {
                              setWishlistOpen(false);
                              router.push(`/shop/${item.product.slug}`);
                            }}
                          >
                            {item.product.name}
                          </h4>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">
                            {item.product.category}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="text-base font-black text-gray-950 whitespace-nowrap">
                            ৳{item.product.price.toLocaleString()}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleBuyNow(item)}
                              className="flex-1 bg-black text-white px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                              <IoBagOutline size={12} />
                              Buy Now
                            </button>

                            <button
                              onClick={() =>
                                removeFromWishlist(item.product.id)
                              }
                              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 border border-gray-100 transition-all"
                              title="Remove"
                            >
                              <IoTrashOutline size={16} />
                            </button>
                          </div>
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
                  className="w-full py-3 text-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
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
