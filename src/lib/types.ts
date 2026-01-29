// TypeScript Types for E-Commerce Application

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale items
  category: "shirt" | "pant" | "accessory" | "lifestyle";
  tags: string[]; // ['new-arrival', 'trending', 'bestseller']
  images: string[]; // Multiple image URLs
  sizes: string[]; // ['S', 'M', 'L', 'XL']
  colors?: string[]; // ['Black', 'Navy', 'White']
  stock: number;
  sku: string;
  rating?: number; // 0-5
  reviewCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: "featured" | "price-asc" | "price-desc" | "newest";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  mobileImage?: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
}
