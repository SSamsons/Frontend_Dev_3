export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface FavouriteItem extends Product {
  quantity: number;
} 