import { createClient } from '@/lib/supabase/server';
import type { Order, OrderItem } from '@/types';

// Generate a unique order number in the format CC-YYYYMMDD-NNNN
export async function generateOrderNumber(): Promise<string> {
  const supabase = await createClient();
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

  // Count orders created today to generate the sequence
  const { count } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', `${today.toISOString().slice(0, 10)}T00:00:00Z`);

  const sequence = String((count ?? 0) + 1).padStart(4, '0');
  return `CC-${dateStr}-${sequence}`;
}

// Create a new order with its items in a single operation
export async function createOrder(params: {
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  items: { productId: string; productName: string; quantity: number; unitPrice: number }[];
}): Promise<{ order: Order | null; error: string | null }> {
  const supabase = await createClient();

  const orderNumber = await generateOrderNumber();

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: params.userId,
      customer_name: params.customerName,
      customer_email: params.customerEmail,
      customer_phone: params.customerPhone,
      customer_address: params.customerAddress,
      total_amount: params.totalAmount,
      status: 'confirmed',
    })
    .select()
    .single();

  if (orderError) {
    console.error('Failed to create order:', orderError.message);
    return { order: null, error: orderError.message };
  }

  // Insert order items
  const orderItems = params.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    quantity: item.quantity,
    unit_price: item.unitPrice,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Failed to create order items:', itemsError.message);
    return { order: null, error: itemsError.message };
  }

  return { order, error: null };
}

// Fetch an order with its items by order ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Failed to fetch order:', error.message);
    return null;
  }

  return data;
}

// Fetch all orders for the current user
export async function getUserOrders(): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch user orders:', error.message);
    return [];
  }

  return data ?? [];
}
