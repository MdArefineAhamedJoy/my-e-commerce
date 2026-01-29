import FeaturedCollections from "@/components/home/FeaturedCollections";
import HeroSlider from "@/components/home/HeroSlider";
import Newsletter from "@/components/home/Newsletter";
import ProductGrid from "@/components/home/ProductGrid";
import { getProductsByTag } from "@/lib/mockData";

export default function HomePage() {
  const newArrivals = getProductsByTag("new-arrival", 4);
  const trending = getProductsByTag("trending", 4);
  const bestSellers = getProductsByTag("bestseller", 4);

  return (
    <div
      className="min-h-screen"
      style={{ paddingTop: "var(--header-height, 80px)" }}
    >
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Collections */}
      <section className="py-16 md:py-20 bg-gray-50">
        <FeaturedCollections />
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20">
        <ProductGrid
          title="New Arrivals"
          subtitle="Fresh styles just dropped"
          products={newArrivals}
          viewAllLink="/shop?tag=new-arrival"
        />
      </section>

      {/* Trending Now */}
      <section className="py-16 md:py-20 bg-gray-50">
        <ProductGrid
          title="Trending Now"
          subtitle="What everyone is wearing"
          products={trending}
          viewAllLink="/shop?tag=trending"
        />
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20">
        <ProductGrid
          title="Best Sellers"
          subtitle="Our most loved pieces"
          products={bestSellers}
          viewAllLink="/shop?tag=bestseller"
        />
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-gray-800" />
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent group-hover:from-orange-500/20 transition-all duration-300" />
        <Newsletter />
      </section>
    </div>
  );
}
