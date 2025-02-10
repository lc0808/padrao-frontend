import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="font-montserrat flex flex-row justify-between w-full items-center p-2 sm:p-6 pb-0 sm:pb-1 bg-[#f2f2f2]">
      <Image
        src="assets/logo.svg"
        alt="ECommerce Logo"
        width={300}
        height={300}
        className="w-[160px] sm:w-[200px] md:w-[300px] h-auto"
        priority
      />
      <div className="p-2 sm:p-7 flex flex-row gap-2 sm:gap-9">
        <Link
          href={"/"}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs sm:text-base"
        >
          Home
        </Link>
        <Link
          href={"/"}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs sm:text-base"
        >
          Tênis
        </Link>
        <Link
          href={"/"}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs sm:text-base"
        >
          Camisetas
        </Link>
        <Link
          href={"/"}
          className="hover:font-medium transition-all ease-in-out duration-150 text-xs sm:text-base"
        >
          Calças
        </Link>
      </div>
    </div>
  );
}
