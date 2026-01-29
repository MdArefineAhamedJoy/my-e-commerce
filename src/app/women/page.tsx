import CategoryLayout from "@/components/shop/CategoryLayout";
import ClassicBanner from "@/components/shop/ClassicBanner";
import SubCategoryGrid, {
  SubCategory,
} from "@/components/shop/SubCategoryGrid";
import { getProductsByGender } from "@/lib/mockData";
import { Product } from "@/lib/types";

// Helper to filter by exact subcategory
const getProductsBySubcategory = (products: Product[], subcategory: string) => {
  return products.filter(
    (p) => p.category.toLowerCase() === subcategory.toLowerCase(),
  );
};

const womenCategories: SubCategory[] = [
  {
    id: "w-1",
    name: "Tops & Blouses",
    slug: "top",
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "w-2",
    name: "Dresses",
    slug: "dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop",
  },
  {
    id: "w-3",
    name: "Skirts",
    slug: "skirt",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1929&auto=format&fit=crop",
  },
  {
    id: "w-4",
    name: "Pants",
    slug: "pants",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "w-5",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "w-6",
    name: "Shoes",
    slug: "shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1760&auto=format&fit=crop",
  },
];

export default function WomenPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = searchParams?.category;
  const allWomenProducts = getProductsByGender("women");

  return (
    <main>
      <ClassicBanner
        title={
          selectedCategory
            ? `${selectedCategory} Collection`
            : "Women's Collection"
        }
        subtitle="Elegance designed for every moment"
        backgroundImage="https://images.unsplash.com/photo-1617931632967-691a1d13cc4f?q=80&w=2070&auto=format&fit=crop"
      />

      {selectedCategory ? (
        <CategoryLayout
          gender="women"
          categoryName={selectedCategory}
          products={getProductsBySubcategory(
            allWomenProducts,
            selectedCategory,
          )}
        />
      ) : (
        <SubCategoryGrid gender="women" categories={womenCategories} />
      )}
    </main>
  );
}
