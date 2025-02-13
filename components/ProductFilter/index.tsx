import { useProductContext } from "../../contexts/ProductContext";
import { ProductCategory } from "../../types/product";
import { Button } from "../Button";

interface FilterItem {
  id: ProductCategory;
  label: string;
}

const ProductFilter: React.FC = ({}) => {
  const { activeFilter, setActiveFilter } = useProductContext();

  const filterItems: FilterItem[] = [
    { id: ProductCategory.All, label: "Todos os Produtos" },
    { id: ProductCategory.Sneakers, label: ProductCategory.Sneakers },
    { id: ProductCategory.TShirts, label: ProductCategory.TShirts },
    { id: ProductCategory.Pants, label: ProductCategory.Pants },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-10">
      {filterItems.map((item) => (
        <Button
          key={item.id}
          size={"lg"}
          variant={activeFilter === item.id ? "default" : "secondary"}
          className={`text-sm md:text-lg ${
            item.id === ProductCategory.All ? "col-span-3 sm:col-span-1" : ""
          }`}
          onClick={() => setActiveFilter(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ProductFilter;
