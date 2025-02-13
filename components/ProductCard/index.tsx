import { Product } from "../../types/product";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className=" flex flex-col items-center font-montserrat ">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[550px] lg:h-[550px] object-center object-cover"
          unoptimized
        />
        {product.discount_percentage && (
          <div className="absolute top-0 right-0 bg-primary bg-red-500 text-white text-sm md:text-base px-3 sm:px-4 md:px-16 py-1">
            {product.discount_percentage}% OFF
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 items-center max-w-full">
        <h2 className="text-base md:text-2xl font-semibold text-gray-800 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap truncate">
          {product.name}
        </h2>
        <div className="flex gap-2">
          <p
            className={`text-xs md:text-base font-medium text-gray-800 ${
              product.promotional_price ? "line-through" : ""
            }`}
          >
            R$ {product.price}
          </p>
          {product.promotional_price && (
            <p className="text-xs md:text-base font-medium text-gray-800">
              R$ {product.promotional_price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
