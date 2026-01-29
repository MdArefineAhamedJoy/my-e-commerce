"use client";

import Button from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IoAddOutline, IoRemoveOutline, IoTrashOutline } from "react-icons/io5";

const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleQuantityChange = (
    productId: string,
    size: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, size, newQuantity);
  };

  if (cart.length === 0) {
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <motion.div
              key={`${item.product.id}-${item.selectedSize}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0" />

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/shop/${item.product.slug}`}>
                    <h3 className="font-semibold text-lg hover:text-orange-500 transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 capitalize">
                    {item.product.category}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span>
                      Size: <strong>{item.selectedSize}</strong>
                    </span>
                    {item.selectedColor && (
                      <span>
                        Color: <strong>{item.selectedColor}</strong>
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold mt-2">
                    {item.product.price} BDT
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() =>
                      removeFromCart(item.product.id, item.selectedSize)
                    }
                    className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                  >
                    <IoTrashOutline size={20} />
                  </button>

                  <div className="flex items-center gap-2 border rounded-lg">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product.id,
                          item.selectedSize,
                          item.quantity - 1,
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <IoRemoveOutline size={18} />
                    </button>
                    <span className="w-12 text-center font-medium">
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
                      className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <IoAddOutline size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    Subtotal:{" "}
                    <strong>{item.product.price * item.quantity} BDT</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{subtotal} BDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `${shipping} BDT`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-gray-500">
                  Add {2000 - subtotal} BDT more for free shipping
                </p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{total} BDT</span>
                </div>
              </div>
            </div>

            <Button fullWidth className="mb-3">
              Proceed to Checkout
            </Button>
            <Link href="/shop">
              <Button variant="outline" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
