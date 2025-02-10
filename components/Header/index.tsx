"use client";

import Image from "next/image";
import Search from "../Search";
import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row justify-between w-full items-center p-2 pr-5 sm:p-4 sm:pr-8">
      <Image
        src="assets/logo.svg"
        alt="ECommerce Logo"
        width={300}
        height={300}
        className="w-[160px] sm:w-[200px] md:w-[300px] h-auto"
        priority
      />
      <div className="flex flex-row items-center gap-2 sm:gap-4 w-full justify-end">
        <Search
          placeholder="Quero comprar algo específico ..."
          className="w-fit sm:w-96"
          onSearch={function (term: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Link
          href={"/login"}
          className="hover:bg-gray-200 transition-all ease-in-out duration-300 p-0.5 sm:p-2 rounded-full"
        >
          <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
        </Link>
        <Link
          href={"/cart"}
          className="hover:bg-gray-200 transition-all ease-in-out duration-300 p-0.5 sm:p-2 rounded-full"
        >
          <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
        </Link>
      </div>
    </div>
  );
}
