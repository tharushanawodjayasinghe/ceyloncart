import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getOrderById } from '@/services/orders.service';
import { uuidSchema } from '@/lib/validations/api.schema';

// GET /api/orders/[id] — Fetch a single order with UUID validation and ownership check
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Validate UUID format to prevent parameter manipulation
    const uuidResult = uuidSchema.safeParse(id);
    if (!uuidResult.success) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    // 2. Check authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Access denied' },
        { status: 401 }
      );
    }

    // 3. Fetch order
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 4. Verify ownership (users can only access their own orders)
    if (order.user_id && order.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden: Access denied' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error('GET /api/orders/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
