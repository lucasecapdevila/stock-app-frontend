export type ProductType = 'Económico' | 'Intermedio' | 'Premium';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  stock: number;
}