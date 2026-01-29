"use client";

import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkCircle } from "react-icons/io5";

interface NewsletterFormData {
  email: string;
}

const Newsletter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>();

  const onSubmit = (data: NewsletterFormData) => {
    console.log("Newsletter signup:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Fashion Community
        </h2>
        <p className="text-lg mb-8 text-gray-300">
          Subscribe to get exclusive offers, style tips, and early access to new
          collections
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-full py-4 px-6 animate-fade-in">
            <IoCheckmarkCircle size={28} className="text-green-400" />
            <p className="text-lg font-semibold">
              Thanks for subscribing! Check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-400 shadow-xl text-base"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-2 ml-4">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="whitespace-nowrap shadow-2xl"
              >
                Subscribe Now
              </Button>
            </div>
          </form>
        )}

        <p className="text-sm text-gray-400 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
