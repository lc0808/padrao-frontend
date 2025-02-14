"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

type CartItemProps = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  promotional_price?: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  image,
  name,
  description,
  price,
  promotional_price,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px,1fr] md:grid-cols-[250px,1fr] lg:grid-cols-[300px,1fr] gap-4 bg-white rounded-lg shadow-sm py-2">
      <div className="w-full aspect-square relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
          className="object-cover rounded-lg p-2"
          unoptimized
        />
      </div>
      <div className="grid grid-rows-[auto,1fr,auto] gap-4 font-saira p-5">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-8">
            <h3 className="text-xl font-light">{name}</h3>
            <p className="text-sm text-gray-600 font-light">{description}</p>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="text-red-500 hover:bg-red-100 rounded-full p-1 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-row items-end justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-3 border border-gray-200 rounded-md p-1">
            <button
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p
              className={`sm:text-xl font-semibold text-gray-800 ${
                promotional_price ? "line-through text-red-500" : ""
              }`}
            >
              R${(price * quantity).toFixed(2)}
            </p>
            {promotional_price && (
              <p className="sm:text-xl font-semibold text-gray-800">
                R${(promotional_price * quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
