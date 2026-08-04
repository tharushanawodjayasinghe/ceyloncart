// ============================================================
// CeylonCart — Shared TypeScript Types
// ============================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: 'confirmed' | 'failed';
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

// Cart types (client-side only, stored in Context + localStorage)
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

// Checkout form data (passed between checkout → payment → confirmation)
export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Payment simulation result
export interface PaymentResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
}
