export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  createdAt: string;
}

export interface Sale {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  saleDate: string;
  notes: string;
}

export interface Report {
  id: number;
  title: string;
  type: string;
  generatedAt: string;
  data: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}
