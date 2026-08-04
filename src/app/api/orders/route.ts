import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createOrder } from '@/services/orders.service';
import { createOrderApiSchema } from '@/lib/validations/api.schema';

// POST /api/orders — Create a new order with validation and auth enforcement
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user from server session token
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to place an order' },
        { status: 401 }
      );
    }

    // 2. Parse & validate request body using Zod
    const body = await request.json();
    const validationResult = createOrderApiSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      items,
    } = validationResult.data;

    // 3. Create order with authenticated user.id (prevents user ID spoofing)
    const { order, error } = await createOrder({
      userId: user.id,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      items,
    });

    if (error || !order) {
      return NextResponse.json(
        { error: error ?? 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
    });
  } catch (err) {
    console.error('POST /api/orders error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
