export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'tea' | 'cold' | 'dessert';
  price: number;
  rating: number;
  image: string;
  ingredients: string[];
  goodFor: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SwipeAction {
  productId: string;
  direction: 'left' | 'right';
  timestamp: number;
}

export enum ViewMode {
  GRID = 'GRID',
  SWIPE = 'SWIPE'
}