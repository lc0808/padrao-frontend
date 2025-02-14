"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product } from "../../../types/product";
import { useProductContext } from "../../../contexts/ProductContext";
import Loading from "../../../components/Loading";
import { Button } from "../../../components/Button";
import { HeartIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../../../components/Breadcrumb";
import { useCartContext } from "../../../contexts/CartContext";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useProductContext();
  const { addItem } = useCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const findProduct = products.find((product) => product.id === id);
    if (findProduct) {
      setProduct(findProduct);
    }
    setIsLoading(false);
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      toast.success("Produto adicionado ao carrinho!");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Produto não encontrado
          </h1>
          <p className="mt-2">O produto que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb productName={product.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-4 ">
        <div className="w-full flex max-sm:justify-center items-center">
          <div className="w-[350px] h-[350px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[550px] xl:h-[550px] relative ">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover "
              unoptimized
            />
          </div>
        </div>
        <div className="font-montserrat flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <button onClick={() => setIsFavorite(!isFavorite)}>
                  <HeartIcon
                    className={`h-6 w-6 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex gap-2">
                {product.promotional_price && (
                  <p className="text-2xl font-bold text-red-500">
                    R${product.promotional_price}
                  </p>
                )}
                <p
                  className={`text-2xl font-bold  ${
                    product.promotional_price
                      ? "line-through text-gray-600"
                      : "text-red-500"
                  }`}
                >
                  R${product.price}
                </p>
              </div>
            </div>

            <h1 className="text-3xl">Descrição</h1>

            <p className="mt-4">{product.description}</p>
          </div>
          <div>
            <Button
              className="font-light text-lg w-full"
              onClick={handleAddToCart}
            >
              ADICIONAR AO CARRINHO
            </Button>
            <hr className="mt-4 border-t border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
