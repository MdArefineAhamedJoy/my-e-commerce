import CategoryLayout from "@/components/shop/CategoryLayout";
import ClassicBanner from "@/components/shop/ClassicBanner";
import SubCategoryGrid, {
  SubCategory,
} from "@/components/shop/SubCategoryGrid";
import { getProductsByGender } from "@/lib/mockData";
import { Product } from "@/lib/types";

// Helper to filter by exact subcategory
// Assuming mockData has 'category' field matching these slugs
const getProductsBySubcategory = (products: Product[], subcategory: string) => {
  return products.filter(
    (p) => p.category.toLowerCase() === subcategory.toLowerCase(),
  );
};

const menCategories: SubCategory[] = [
  {
    id: "m-1",
    name: "T-Shirts",
    slug: "t-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
  },
  {
    id: "m-2",
    name: "Pants",
    slug: "pants",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897&auto=format&fit=crop",
  },
  {
    id: "m-3",
    name: "Shirts",
    slug: "shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "m-4",
    name: "Polos",
    slug: "polo",
    image:
      "https://images.unsplash.com/photo-1625910515337-17d79b8b1569?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "m-5",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1589785233157-55099392e212?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "m-6",
    name: "Caps",
    slug: "cap",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936&auto=format&fit=crop",
  },
];

export default function MenPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = searchParams?.category;
  const allMenProducts = getProductsByGender("men");

  return (
    <main>
      <ClassicBanner
        title={
          selectedCategory
            ? `${selectedCategory} Collection`
            : "Men's Collection"
        }
        subtitle="Timeless classics for the modern gentleman"
        backgroundImage="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070&auto=format&fit=crop"
      />

      {selectedCategory ? (
        <CategoryLayout
          gender="men"
          categoryName={selectedCategory}
          products={getProductsBySubcategory(allMenProducts, selectedCategory)}
        />
      ) : (
        <SubCategoryGrid gender="men" categories={menCategories} />
      )}
    </main>
  );
}
