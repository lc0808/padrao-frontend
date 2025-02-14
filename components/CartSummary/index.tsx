import { useCartContext } from "../../contexts/CartContext";
import { Button } from "../Button";

type CartSummaryProps = {
  totalPrice: number;
  freight?: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice, freight }) => {
  const { clearCart } = useCartContext();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
      <h2 className="text-2xl font-semibold mb-6">RESUMO</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal de produtos</span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Frete</span>
          <span>{freight ? "R$ " + freight.toFixed(2) : "Grátis"}</span>
        </div>
        <div className="h-px bg-gray-200 my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>R${(totalPrice + (freight ?? 0)).toFixed(2)}</span>
        </div>
        <Button className="w-full mt-6">FINALIZAR COMPRA</Button>
        <Button
          className="w-full mt-2"
          variant="destructive"
          onClick={clearCart}
        >
          LIMPAR CARRINHO
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
