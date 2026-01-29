import { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  // New Arrivals
  {
    id: "1",
    name: "Premium Cotton Shirt - Navy",
    slug: "premium-cotton-shirt-navy",
    description:
      "Crafted from 100% premium Egyptian cotton for unmatched comfort and breathability.",
    price: 1899,
    originalPrice: 2499,
    category: "shirt",
    tags: ["new-arrival", "bestseller"],
    images: ["/images/products/navy_cotton_shirt_1769620762559.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Black"],
    stock: 45,
    sku: "PCS-NAV-001",
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "2",
    name: "Linen Casual Shirt",
    slug: "linen-casual-shirt",
    description:
      "Lightweight linen perfect for summer styling with a relaxed fit.",
    price: 1599,
    category: "shirt",
    tags: ["new-arrival", "trending"],
    images: ["/images/products/beige_linen_shirt_1769620787431.png"],
    sizes: ["M", "L", "XL"],
    colors: ["Beige", "White"],
    stock: 32,
    sku: "LCS-BEI-002",
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Chino Pants - Khaki",
    slug: "chino-pants-khaki",
    description:
      "Classic chino pants with a modern slim fit. Perfect for both casual and formal occasions.",
    price: 2199,
    originalPrice: 2799,
    category: "pant",
    tags: ["new-arrival"],
    images: ["/images/products/khaki_chino_pants_1769620809342.png"],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Black"],
    stock: 28,
    sku: "CHP-KHA-003",
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "4",
    name: "Oxford Button-Down Shirt",
    slug: "oxford-button-down-shirt",
    description:
      "Timeless Oxford shirt with button-down collar. A wardrobe essential.",
    price: 1699,
    category: "shirt",
    tags: ["new-arrival", "bestseller"],
    images: ["/images/products/oxford_shirt_blue_1769620830446.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Pink"],
    stock: 51,
    sku: "OBD-WHI-004",
    rating: 4.7,
    reviewCount: 203,
  },

  // Trending
  {
    id: "5",
    name: "Denim Jeans - Dark Wash",
    slug: "denim-jeans-dark-wash",
    description:
      "Premium denim with stretch for comfort. Classic 5-pocket styling.",
    price: 2499,
    category: "pant",
    tags: ["trending", "bestseller"],
    images: ["/images/products/dark_denim_jeans_1769620852374.png"],
    sizes: ["30", "32", "34", "36"],
    colors: ["Dark Blue", "Black"],
    stock: 38,
    sku: "DNJ-DAR-005",
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "6",
    name: "Polo T-Shirt - Burgundy",
    slug: "polo-tshirt-burgundy",
    description:
      "Classic polo with modern fit. Made from breathable pique cotton.",
    price: 1299,
    originalPrice: 1699,
    category: "shirt",
    tags: ["trending"],
    images: ["/images/products/burgundy_polo_shirt_1769620869609.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Burgundy", "Navy", "White", "Black"],
    stock: 67,
    sku: "POL-BUR-006",
    rating: 4.4,
    reviewCount: 178,
  },
  {
    id: "7",
    name: "Cargo Pants - Olive",
    slug: "cargo-pants-olive",
    description:
      "Utility-inspired cargo pants with multiple pockets. Modern slim fit.",
    price: 2399,
    category: "pant",
    tags: ["trending"],
    images: ["/images/products/olive_cargo_pants_1769620887141.png"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Olive", "Khaki", "Black"],
    stock: 24,
    sku: "CAR-OLI-007",
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: "8",
    name: "Henley Shirt - Charcoal",
    slug: "henley-shirt-charcoal",
    description:
      "Comfortable henley with 3-button placket. Perfect layering piece.",
    price: 1399,
    category: "shirt",
    tags: ["trending", "new-arrival"],
    images: ["/images/products/charcoal_henley_shirt_1769620905282.png"],
    sizes: ["M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Maroon"],
    stock: 42,
    sku: "HEN-CHA-008",
    rating: 4.3,
    reviewCount: 67,
  },

  // Best Sellers
  {
    id: "9",
    name: "Dress Trousers - Charcoal Grey",
    slug: "dress-trousers-charcoal-grey",
    description:
      "Formal trousers with flat front. Tailored for a sophisticated look.",
    price: 2799,
    category: "pant",
    tags: ["bestseller"],
    images: ["/images/products/grey_dress_trousers_1769620923385.png"],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Charcoal", "Black", "Navy"],
    stock: 29,
    sku: "DRT-CHA-009",
    rating: 4.8,
    reviewCount: 241,
  },
  {
    id: "10",
    name: "Striped Casual Shirt",
    slug: "striped-casual-shirt",
    description:
      "Contemporary striped pattern with spread collar. Versatile styling.",
    price: 1799,
    originalPrice: 2199,
    category: "shirt",
    tags: ["bestseller"],
    images: ["/images/products/striped_casual_shirt_1769620947434.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue/White", "Black/White"],
    stock: 35,
    sku: "STR-BLU-010",
    rating: 4.6,
    reviewCount: 189,
  },
  {
    id: "11",
    name: "Jogger Pants - Black",
    slug: "jogger-pants-black",
    description:
      "Athletic-inspired joggers with tapered fit. Ultimate comfort.",
    price: 1999,
    category: "pant",
    tags: ["bestseller", "trending"],
    images: ["/images/products/black_jogger_pants_1769620963051.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy"],
    stock: 58,
    sku: "JOG-BLA-011",
    rating: 4.7,
    reviewCount: 276,
  },
  {
    id: "12",
    name: "Flannel Shirt - Plaid",
    slug: "flannel-shirt-plaid",
    description:
      "Cozy flannel with classic plaid pattern. Perfect for cooler weather.",
    price: 1899,
    category: "shirt",
    tags: ["bestseller", "new-arrival"],
    images: ["/images/products/plaid_flannel_shirt_1769620984514.png"],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Red Plaid", "Blue Plaid", "Green Plaid"],
    stock: 44,
    sku: "FLA-RED-012",
    rating: 4.9,
    reviewCount: 298,
  },
];

// Helper functions to filter products
export const getProductsByTag = (tag: string, limit?: number) => {
  const filtered = MOCK_PRODUCTS.filter((product) =>
    product.tags.includes(tag),
  );
  return limit ? filtered.slice(0, limit) : filtered;
};

export const getProductsByCategory = (category: string, limit?: number) => {
  const filtered = MOCK_PRODUCTS.filter(
    (product) => product.category === category,
  );
  return limit ? filtered.slice(0, limit) : filtered;
};

export const getProductBySlug = (slug: string) => {
  return MOCK_PRODUCTS.find((product) => product.slug === slug);
};
