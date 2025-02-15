"use client";

import Image from "next/image";
import Search from "../Search";
import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCartContext } from "../../contexts/CartContext";

export default function Header() {
  const { totalItems } = useCartContext();

  return (
    <div className="flex flex-row justify-between w-full items-center p-2 pr-5 sm:p-4 sm:pr-8">
      <Image
        src="/assets/logo.svg"
        alt="ECommerce Logo"
        width={300}
        height={300}
        className="w-[160px] sm:w-[200px] md:w-[300px] h-auto"
        data-testid="logo"
      />
      <div className="flex flex-row items-center gap-2 sm:gap-4 w-full justify-end">
        <Search
          placeholder="Quero comprar algo específico ..."
          className="w-fit sm:w-96"
        />
        <Link
          href={"/login"}
          className="hover:bg-gray-200 transition-all ease-in-out duration-300 p-0.5 sm:p-2 rounded-full"
        >
          <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
        </Link>
        <div className="relative p-2 rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300">
          <Link
            href={"/cart"}
            className="relative block"
            data-testid="cart-button"
          >
            <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </Link>

          {totalItems > 0 && (
            <span
              className="absolute top-1 right-0 sm:top-1 sm:-right-0.5 bg-red-500 text-white text-xs font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center"
              data-testid="cart-items"
            >
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
