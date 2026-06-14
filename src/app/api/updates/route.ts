import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Update from '@/models/Update';

export async function GET() {
  try {
    await dbConnect();
    const updates = await Update.find({ isHidden: false })
      .sort({ postedAt: -1 })
      .limit(50);
      
    return NextResponse.json({ updates });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
  }
}
