import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

type BreadcrumpProps = {
  productName?: string;
  cart?: boolean;
};

const Breadcrumb: React.FC<BreadcrumpProps> = ({ productName, cart }) => {
  return (
    <nav className="flex items-center space-x-1 text-gray-500 mb-5">
      <Link href="/" className="hover:text-gray-700">
        Home
      </Link>
      <ChevronRightIcon className="h-4 w-4" />
      {productName && (
        <>
          <Link href="/" className="hover:text-gray-700">
            Produtos
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-gray-900">{productName}</span>
        </>
      )}
      {cart && (
        <>
          <Link href={"/cart"} className="text-gray-900">
            Carrinho
          </Link>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
