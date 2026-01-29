import CategoryLayout from "@/components/shop/CategoryLayout";
import ClassicBanner from "@/components/shop/ClassicBanner";
import { MOCK_PRODUCTS } from "@/lib/mockData";

const WomenPage = () => {
  const womenProducts = MOCK_PRODUCTS.filter(
    (p) => p.gender === "women" || p.gender === "unisex",
  );

  const categories = [
    { value: "shirt", label: "Tops" },
    { value: "pant", label: "Pants" },
    { value: "lifestyle", label: "Dresses" },
    { value: "accessory", label: "Accessories" },
  ];

  return (
    <div className="flex flex-col">
      <ClassicBanner
        title="Women's Collection"
        subtitle="Elegance redefined for the contemporary woman"
        backgroundImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
      />
      <CategoryLayout
        gender="women"
        products={womenProducts}
        categories={categories}
      />
    </div>
  );
};

export default WomenPage;
