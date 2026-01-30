"use client";

import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoAddOutline,
  IoArrowForwardOutline,
  IoBagHandleOutline,
  IoRemoveOutline,
  IoTrashOutline,
} from "react-icons/io5";

const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

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

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50"
        style={{ paddingTop: "var(--header-height, 80px)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white p-12 rounded-3xl shadow-xl shadow-black/5"
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
            <IoBagHandleOutline size={48} />
          </div>
          <h2 className="text-3xl font-serif font-medium mb-3 text-black">
            Your bag is empty
          </h2>
          <p className="text-gray-400 mb-10 font-medium">
            Looks like you haven&apos;t added any items to your bag yet.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-orange-600 transition-all flex items-center justify-center gap-3"
          >
            Start Shopping
            <IoArrowForwardOutline size={20} />
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className="bg-gray-50 min-h-screen"
      style={{ paddingTop: "var(--header-height, 80px)" }}
    >
      <div className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-black tracking-tighter mb-4">
              Your Shopping Bag<span className="text-orange-600">.</span>
            </h1>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-widest flex items-center gap-2">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
              <span className="w-1 h-1 bg-orange-600 rounded-full" />
              Free shipping over ৳2000
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group bg-white p-6 rounded-3xl shadow-xl shadow-black/5 border border-gray-100/50 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="relative w-32 h-40 md:w-36 md:h-44 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                        <Image
                          src={
                            item.product.images?.[0] ||
                            "/images/placeholder.png"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/product/${item.product.slug}`}>
                              <h3 className="text-xl font-bold text-black hover:text-orange-600 transition-colors line-clamp-1">
                                {item.product.name}
                              </h3>
                            </Link>
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.product.id,
                                  item.selectedSize,
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all shrink-0"
                            >
                              <IoTrashOutline size={20} />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-4 mt-1">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                Size
                              </span>
                              <span className="text-sm font-bold text-gray-600">
                                {item.selectedSize}
                              </span>
                            </div>
                            {item.selectedColor && (
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                  Color
                                </span>
                                <span className="text-sm font-bold text-gray-600 capitalize">
                                  {item.selectedColor}
                                </span>
                              </div>
                            )}
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                Price
                              </span>
                              <span className="text-sm font-bold text-orange-600">
                                ৳{item.product.price}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Controls & Subtotal */}
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
                          <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.selectedSize,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm transition-all"
                            >
                              <IoRemoveOutline size={20} />
                            </button>
                            <span className="w-8 text-center text-lg font-bold text-black">
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
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 hover:bg-black hover:text-white shadow-sm transition-all"
                            >
                              <IoAddOutline size={20} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-1">
                              Total
                            </span>
                            <span className="text-xl font-bold text-black">
                              ৳{item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-gray-100/50 sticky top-32">
                <h2 className="text-xl font-bold mb-8 text-black">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center text-gray-500 font-medium">
                    <span>Bag Total</span>
                    <span className="text-black font-bold">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 font-medium pb-4 border-b border-gray-50">
                    <span>Shipping Fee</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-black text-[10px] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                        Free
                      </span>
                    ) : (
                      <span className="text-black font-bold">৳{shipping}</span>
                    )}
                  </div>

                  {shipping > 0 && (
                    <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                      <p className="text-xs text-orange-600 font-bold leading-relaxed">
                        Add ৳{2000 - subtotal} more to your bag and get{" "}
                        <span className="underline decoration-2 underline-offset-2">
                          Free Delivery
                        </span>
                        !
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <div className="flex justify-between items-center text-2xl font-bold text-black">
                      <span>Total Amount</span>
                      <span className="text-orange-600">৳{total}</span>
                    </div>
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mt-2">
                      VAT Included where applicable
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 group"
                  >
                    Proceed to Checkout
                    <IoArrowForwardOutline
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>

                  <Link href="/shop" className="w-full">
                    <button className="w-full py-5 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all">
                      Continue Shopping
                    </button>
                  </Link>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center justify-center gap-3 mt-8 pt-8 border-t border-gray-50 opacity-40">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                    <div className="w-6 h-6 rounded-full bg-gray-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    100% Secure Transaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
