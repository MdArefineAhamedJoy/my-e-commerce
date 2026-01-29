"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const slides: HeroSlide[] = [
  {
    id: "1",
    image: "/images/hero-1.jpg",
    title: "Redefine Your Style",
    subtitle: "New Winter Collection 2026",
    ctaText: "Shop Now",
    ctaLink: "/shop?tag=new-arrival",
  },
  {
    id: "2",
    image: "/images/hero-2.jpg",
    title: "Where Comfort Meets Elegance",
    subtitle: "Premium Cotton Collection",
    ctaText: "Explore",
    ctaLink: "/shop?category=shirt",
  },
  {
    id: "3",
    image: "/images/hero-3.jpg",
    title: "Crafted for the Modern You",
    subtitle: "Exclusive Lifestyle Range",
    ctaText: "Discover",
    ctaLink: "/shop",
  },
];

const HeroSlider: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-custom-pagination",
        }}
        navigation={{
          nextEl: ".swiper-custom-next",
          prevEl: ".swiper-custom-prev",
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    index === 0
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : index === 1
                        ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                        : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative h-full container flex items-center px-4 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl text-white z-10 w-full"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xs md:text-sm mb-3 md:mb-4 tracking-wider uppercase text-orange-400 font-semibold break-words"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight break-words"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Link href={slide.ctaLink}>
                      <Button
                        size="lg"
                        variant="primary"
                        className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                      >
                        {slide.ctaText}
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <button className="swiper-custom-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all group">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="swiper-custom-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all group">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Custom Pagination */}
        <div className="swiper-custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3"></div>
      </Swiper>

      <style jsx global>{`
        .swiper-custom-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s;
        }
        .swiper-custom-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #f97316;
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
