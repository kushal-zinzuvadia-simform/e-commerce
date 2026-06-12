export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
  category: Category;
  // Locally computed properties for pricing demo
  discountPercentage?: number;
  discountedPrice?: number;
}
