import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Update from '@/models/Update';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    // Wait for params to resolve in Next.js 15+ if applicable, but params is available here directly in Next 14.
    // In Next 15, params is a promise. Assuming Next 14/15 compatibility:
    const { id } = await Promise.resolve(params);
    const body = await req.json();
    
    const update = await Update.findByIdAndUpdate(id, body, { new: true });
    if (!update) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, update });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await Promise.resolve(params);
    
    const update = await Update.findByIdAndDelete(id);
    if (!update) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
