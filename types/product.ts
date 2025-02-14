export enum ProductCategory {
  All = "all",
  Sneakers = "Tênis",
  TShirts = "Camisetas",
  Pants = "Calças",
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  promotional_price?: number;
  image: string;
  category: string;
  discount_percentage?: number;
};
