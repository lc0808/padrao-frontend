"use client";

import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";
import { Button } from "../../components/Button";
import CartItem from "../../components/CartItem";
import CartSummary from "../../components/CartSummary";
import { useCartContext } from "../../contexts/CartContext";
import HelpLinks from "../../components/HelpLinks";

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, updateItemQuantity, removeItem } =
    useCartContext();

  if (items.length === 0) {
    return (
      <div className="font-montserrat px-8 pb-10">
        <Breadcrumb cart />
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-gray-600 mb-8">
            Adicione produtos ao seu carrinho para continuar comprando
          </p>
          <Link href="/">
            <Button>Continuar Comprando</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-montserrat px-14 pb-10">
      <Breadcrumb cart />
      <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-extrabold">Carrinho</h1>
            <div className="font-saira flex gap-1 text-lg">
              <p className="font-light  text-gray-800">
                Total ({totalItems} {totalItems > 1 ? "produtos" : "produto"})
              </p>
              <p className="font-semibold text-gray-700">R${totalPrice}</p>
            </div>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onUpdateQuantity={updateItemQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <CartSummary totalPrice={totalPrice} freight={40} />
          <HelpLinks />
        </div>
      </div>
    </div>
  );
};

export default Cart;
