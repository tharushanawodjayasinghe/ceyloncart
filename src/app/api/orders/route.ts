import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/services/orders.service';

// POST /api/orders — create a new order with items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      items,
    } = body;

    // Basic input validation
    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { order, error } = await createOrder({
      userId,
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

    return NextResponse.json({ orderId: order.id, orderNumber: order.order_number });
  } catch (err) {
    console.error('POST /api/orders error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
