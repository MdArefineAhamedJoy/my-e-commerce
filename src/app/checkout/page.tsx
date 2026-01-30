"use client";

import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  IoBagCheckOutline,
  IoLocationOutline,
  IoWalletOutline,
} from "react-icons/io5";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    address: "",
    paymentMethod: "bkash",
  });

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const handleCompleteOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setStep(3);
    }, 1500);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
        <button
          onClick={() => router.push("/")}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <main
      className="bg-gray-50 min-h-screen"
      style={{ paddingTop: "var(--header-height, 0px)" }}
    >
      <div className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-black tracking-tighter mb-4">
              Complete Your Purchase<span className="text-orange-600">.</span>
            </h1>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className={step >= 1 ? "text-black" : ""}>Shipping</span>
              <div className="w-8 h-px bg-gray-200" />
              <span className={step >= 2 ? "text-black" : ""}>Payment</span>
              <div className="w-8 h-px bg-gray-200" />
              <span className={step >= 3 ? "text-black" : ""}>
                Confirmation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form Area */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                      <IoLocationOutline size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Shipping Address</h2>
                      <p className="text-sm text-gray-400 font-medium">
                        Where should we send your order?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+880 1XXX XXXXXX"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Area / Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Uttara, Dhaka"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Detailed Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="House #, Road #, Flat #"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={
                      !formData.name || !formData.phone || !formData.address
                    }
                    className="w-full mt-10 bg-black text-white py-5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-orange-600 transition-all disabled:opacity-50 disabled:hover:bg-black"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                      <IoWalletOutline size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Payment Method</h2>
                      <p className="text-sm text-gray-400 font-medium">
                        Select how you&apos;d like to pay
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "bkash", name: "bKash", icon: "📱" },
                      { id: "cod", name: "Cash on Delivery", icon: "🚚" },
                      { id: "card", name: "Credit/Debit Card", icon: "💳" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            paymentMethod: method.id,
                          }))
                        }
                        className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all ${
                          formData.paymentMethod === method.id
                            ? "border-orange-500 bg-orange-50/30 shadow-lg shadow-orange-500/5 scale-[1.02]"
                            : "border-gray-50 bg-gray-50/30 hover:border-gray-200"
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-bold text-sm tracking-tight">
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-12">
                    <button
                      onClick={prevStep}
                      className="px-8 py-5 rounded-2xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      className="flex-1 bg-black text-white py-5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-orange-600 transition-all flex items-center justify-center gap-3"
                    >
                      <IoBagCheckOutline size={24} />
                      Place Order ৳{cartTotal}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 md:p-20 rounded-3xl shadow-xl shadow-black/5 text-center flex flex-col items-center"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                    <IoBagCheckOutline size={48} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-500 mb-10 max-w-sm font-medium">
                    Thank you for your purchase, {formData.name}. We&apos;ll
                    notify you as soon as your order is on its way.
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="bg-black text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-orange-600 transition-all"
                  >
                    Return to Shop
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 lg:sticky lg:top-32">
                <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                <div className="flex flex-col gap-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                        <Image
                          src={
                            item.product.images?.[0] ||
                            "/images/placeholder.png"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1 overflow-hidden">
                        <h4 className="font-bold text-xs truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex gap-2 text-[10px] text-gray-400 font-black uppercase tracking-tighter">
                          <span>{item.selectedSize}</span>
                          {item.selectedColor && (
                            <>
                              <div className="w-px h-2 bg-gray-200" />
                              <span>{item.selectedColor}</span>
                            </>
                          )}
                          <div className="w-px h-2 bg-gray-200" />
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="text-sm font-bold text-orange-600">
                          ৳{item.product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-50 pt-6 space-y-4">
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span>Subtotal</span>
                    <span>৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span>Shipping</span>
                    <span className="text-green-600 uppercase text-[10px] font-black tracking-widest">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-black pt-2 border-t border-gray-50">
                    <span>Total</span>
                    <span>৳{cartTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
