"use client";

import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../contexts/ProductContext";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const { filteredProducts, isLoading, error } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const getCurrentProducts = (): Product[] => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col font-montserrat ">
      <div
        className={`bg-[url('../public/assets/services.webp')] bg-cover bg-top bg-no-repeat aspect-[29/8.5] `}
      />
      <ProductFilter />

      {isLoading && <Loading />}
      {error && <p>Error: {error.message}</p>}

      {!isLoading && (
        <>
          <div className="flex justify-between px-10">
            <p className="text-lg" data-testid="Produtos">
              {filteredProducts.length} Produtos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-10 pt-14 ">
            {getCurrentProducts().map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
