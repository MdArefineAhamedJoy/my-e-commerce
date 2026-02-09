"use client";

import Button from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import {
  IoAddOutline,
  IoClose,
  IoRemoveOutline,
  IoTrashOutline,
} from "react-icons/io5";

const MiniCart: React.FC = () => {
  const {
    cart,
    isMiniCartOpen,
    setMiniCartOpen,
    updateCartQuantity,
    removeFromCart,
  } = useStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (isMiniCartOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Apply instantly to prevent shaking
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
  }, [isMiniCartOpen]);

  const handleQuantityChange = (
    productId: string,
    size: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, size, newQuantity);
  };

  return (
    <AnimatePresence>
      {isMiniCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMiniCartOpen(false)}
            className="fixed inset-0 z-50 cursor-default bg-black/5"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              duration: 0.4,
            }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md lg:max-w-sm bg-white z-50 shadow-[-10px_0_50px_rgba(0,0,0,0.1)] flex flex-col rounded-l-[1rem] border-l border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  Shopping Bag
                </h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items in
                  your bag
                </p>
              </div>
              <button
                onClick={() => setMiniCartOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-95 text-gray-400 hover:text-gray-900"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your Bag is Empty
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-[200px] mx-auto text-sm">
                    Looks like you haven&apos;t added anything to your bag yet.
                  </p>
                  <Button
                    onClick={() => setMiniCartOpen(false)}
                    className="rounded-full px-8 py-3"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 shrink-0 relative rounded-xl overflow-hidden bg-gray-50 ring-1 ring-gray-100">
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

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/shop/${item.product.slug}`}
                            onClick={() => setMiniCartOpen(false)}
                          >
                            <h3 className="font-extrabold text-gray-900 text-sm leading-snug hover:text-orange-600 transition-colors line-clamp-1">
                              {item.product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              Size:
                            </span>
                            <span className="px-2 py-0.5 bg-gray-50 rounded text-[10px] font-black text-gray-700 border border-gray-200 uppercase">
                              {item.selectedSize}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-black text-gray-950 text-base whitespace-nowrap">
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}{" "}
                            BDT
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity - 1,
                                )
                              }
                              className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-400 hover:text-gray-900 disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <IoRemoveOutline size={12} />
                            </button>
                            <div className="flex flex-col items-center px-2">
                              <span className="text-[8px] font-black text-gray-400 uppercase leading-none mb-0.5">
                                Qty
                              </span>
                              <span className="text-xs font-black text-gray-900 leading-none">
                                {item.quantity}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-400 hover:text-gray-900"
                            >
                              <IoAddOutline size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className="flex flex-col justify-start">
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                          title="Remove Item"
                        >
                          <IoTrashOutline size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="bg-white/50 backdrop-blur-sm border-t border-gray-100 p-6 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-gray-900 whitespace-nowrap">
                      {subtotal.toLocaleString()} BDT
                    </span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      Excluding shipping and taxes
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/cart"
                    onClick={() => setMiniCartOpen(false)}
                    className="col-span-2"
                  >
                    <Button
                      fullWidth
                      className="rounded-full py-2.5 bg-orange-600 hover:bg-orange-700 font-bold text-sm shadow-lg shadow-orange-100"
                    >
                      Checkout Bag
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setMiniCartOpen(false)}
                    className="col-span-2 rounded-full py-2 border-2 border-gray-100 hover:border-gray-200 font-bold text-gray-600 text-xs"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
