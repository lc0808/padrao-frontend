import { Product } from "../types/product";

export interface CartItem extends Product {
  quantity: number;
}

export type CartContentType = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};
