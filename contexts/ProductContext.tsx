"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductCategory } from "../types/product";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { normalizeText } from "../lib/utils";

type ProductContextType = {
  products: Product[];
  searchTerm: string;
  activeFilter: ProductCategory;
  setActiveFilter: (filter: ProductCategory) => void;
  setSearchTerm: (term: string) => void;
  filteredProducts: Product[];
  isLoading: boolean;
  error: Error | null;
};

const ProductContext = createContext<ProductContextType>({
  products: [],
  searchTerm: "",
  activeFilter: ProductCategory.All,
  setActiveFilter: () => {},
  setSearchTerm: () => {},
  filteredProducts: [],
  isLoading: false,
  error: null,
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>(
    ProductCategory.All
  );
  const { products, isLoading, error } = useFilteredProducts(activeFilter);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts =
    products?.filter((product) =>
      normalizeText(product.name).includes(normalizeText(searchTerm))
    ) ?? [];

  return (
    <ProductContext.Provider
      value={{
        products: products ?? [],
        searchTerm,
        activeFilter,
        setActiveFilter,
        setSearchTerm,
        filteredProducts,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export { ProductContext };
