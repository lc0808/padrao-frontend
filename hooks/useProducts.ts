import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { Product } from "../types/product";

export function useProducts() {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  return {
    products,
    isLoading,
    error,
    refetch,
  };
}
