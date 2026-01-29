import CategoryLayout from "@/components/shop/CategoryLayout";
import ClassicBanner from "@/components/shop/ClassicBanner";
import { MOCK_PRODUCTS } from "@/lib/mockData";

const MenPage = () => {
  const menProducts = MOCK_PRODUCTS.filter(
    (p) => p.gender === "men" || p.gender === "unisex",
  );

  const categories = [
    { value: "shirt", label: "Shirts" },
    { value: "pant", label: "Pants" },
    { value: "accessory", label: "Accessories" },
  ];

  return (
    <div className="flex flex-col">
      <ClassicBanner
        title="Men's Essentials"
        subtitle="Timeless pieces for the modern gentleman"
        backgroundImage="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop"
      />
      <CategoryLayout
        gender="men"
        products={menProducts}
        categories={categories}
      />
    </div>
  );
};

export default MenPage;
