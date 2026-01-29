"use client";

import Button from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                Shopping Cart (
                {cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <button
                onClick={() => setMiniCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <Button onClick={() => setMiniCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 pb-4 border-b"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0" />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={() => setMiniCartOpen(false)}
                        >
                          <h3 className="font-medium text-sm line-clamp-1 hover:text-orange-500 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-600 mt-1">
                          Size: {item.selectedSize}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-sm">
                            {item.product.price} BDT
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 border rounded">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity - 1,
                                )
                              }
                              className="p-1 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <IoRemoveOutline size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1 hover:bg-gray-100"
                            >
                              <IoAddOutline size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize)
                        }
                        className="p-1 hover:bg-red-50 rounded text-red-500 h-fit"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal</span>
                  <span>{subtotal} BDT</span>
                </div>
                <Link href="/cart" onClick={() => setMiniCartOpen(false)}>
                  <Button fullWidth>View Cart</Button>
                </Link>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setMiniCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
