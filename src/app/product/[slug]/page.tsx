import ProductCard from "@/components/product/ProductCard";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductBySlug, getProductsByCategory } from "@/lib/mockData";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products from the same category, excluding the current product
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main
      className="bg-white"
      style={{ paddingTop: "var(--header-height, 0px)" }}
    >
      <ProductDetail product={product} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="container py-20 md:py-32 border-t border-gray-50">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">
              You Might Also Like
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-black tracking-tighter">
              Related Creations<span className="text-orange-600">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
