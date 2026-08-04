import { z } from 'zod';

// UUID validator to prevent malformed parameter injection
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Category query string validator
export const categoryQuerySchema = z.string().max(100).optional();

// Order item validation for POST /api/orders
export const createOrderItemApiSchema = z.object({
  productId: z.string().uuid('Invalid product ID format'),
  productName: z.string().min(1, 'Product name is required').max(200),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(1000),
  unitPrice: z.number().positive('Unit price must be positive'),
});

// Full order creation payload validation
export const createOrderApiSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(7, 'Invalid phone number').max(20),
  customerAddress: z.string().min(5, 'Address is too short').max(500),
  totalAmount: z.number().positive('Total amount must be positive'),
  items: z.array(createOrderItemApiSchema).min(1, 'Order must contain at least one item'),
});

export type CreateOrderApiInput = z.infer<typeof createOrderApiSchema>;
