import { useProducts } from "./useProducts";
import { Product, ProductCategory } from "../types/product";
import { useMemo } from "react";

export function useFilteredProducts(activeFilter: ProductCategory) {
  const { products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    if (activeFilter === "all") {
      return products;
    }

    return products.filter(
      (product: Product) => product.category === activeFilter
    );
  }, [products, activeFilter]);

  return {
    products: filteredProducts,
    isLoading,
    error,
  };
}
