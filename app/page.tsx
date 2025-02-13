"use client";

import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../contexts/ProductContext";
import Loading from "../components/Loading";

export default function Home() {
  const { filteredProducts, isLoading, error } = useProductContext();

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
            <p className="text-lg">{filteredProducts.length} Produtos</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-10 py-14 ">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
