export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number;
  priceRange: string;
  image: string;
  offers?: string[];
  isVeg?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isRecommended?: boolean;
  isPopular?: boolean;
  customizable?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface RestaurantDetail extends Restaurant {
  address: string;
  menu: MenuCategory[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  deliveryAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}