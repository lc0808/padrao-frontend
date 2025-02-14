"use client";

import Image from "next/image";
import { Button } from "../Button";
import { ProductCategory } from "../../types/product";
import { useProductContext } from "../../contexts/ProductContext";

export default function Footer() {
  const { setActiveFilter } = useProductContext();

  return (
    <div className="font-montserrat flex flex-row justify-between w-full items-center p-2 sm:p-6 pb-0 sm:pb-1 bg-[#f2f2f2]">
      <Image
        src="/assets/logo.svg"
        alt="ECommerce Logo"
        width={300}
        height={300}
        className="w-[160px] sm:w-[200px] md:w-[300px] h-auto"
        priority
      />
      <div className="p-0.5 sm:p-6 flex flex-row gap-1.5 sm:gap-9">
        <Button
          variant={"ghost"}
          onClick={() => setActiveFilter(ProductCategory.All)}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs md:text-base max-md:px-0"
        >
          Home
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setActiveFilter(ProductCategory.Sneakers)}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs md:text-base max-md:px-0"
        >
          Tênis
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setActiveFilter(ProductCategory.TShirts)}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs md:text-base max-md:px-0"
        >
          Camisetas
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setActiveFilter(ProductCategory.Pants)}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs md:text-base max-md:px-0.5"
        >
          Calças
        </Button>
      </div>
    </div>
  );
}
