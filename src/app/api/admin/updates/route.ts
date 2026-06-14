import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Update from '@/models/Update';

export async function GET() {
  try {
    await dbConnect();
    // Fetch all updates including hidden ones, sorted by newest
    const updates = await Update.find().sort({ postedAt: -1 });
    return NextResponse.json({ updates });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
