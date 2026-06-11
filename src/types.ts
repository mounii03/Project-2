/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Category {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  ACCESSORIES = 'Accessories',
  LIFESTYLE = 'Lifestyle'
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number; // For discounts
  discountPercent?: number; // Visual helper
  category: Category;
  description: string;
  features: string[];
  specs: Record<string, string>;
  images: string[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  brand: string;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description: string;
  minSpend?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  comment: string;
  rating: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
  wishlist: string[]; // Product IDs
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
