import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(10, 'Please enter a complete address')
    .max(500, 'Address is too long'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
