"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface SubCategory {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface SubCategoryGridProps {
  gender: "men" | "women";
  categories: SubCategory[];
}

const SubCategoryGrid: React.FC<SubCategoryGridProps> = ({
  gender,
  categories,
}) => {
  return (
    <div className="container py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">
          Shop By Category
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
          Explore {gender === "men" ? "Men's" : "Women's"} Collection
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link key={category.id} href={`/${gender}?category=${category.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-white text-3xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h3>
                <div className="w-16 h-1 bg-orange-500 rounded-full group-hover:w-24 transition-all duration-300" />
                <p className="text-gray-300 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Discover {category.name} &rarr;
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryGrid;
