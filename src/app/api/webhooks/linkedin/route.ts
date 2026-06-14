import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Update from '@/models/Update';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // Expected Payload from Zapier:
    // {
    //   "content": "Just launched a new feature...",
    //   "mediaUrl": "https://image...",
    //   "url": "https://linkedin.com/posts/...",
    //   "externalId": "urn:li:share:12345"
    // }
    
    const body = await req.json();
    const { content, mediaUrl, url, externalId } = body;

    if (!content || !url || !externalId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await Update.findOne({ externalId });
    if (existing) {
      return NextResponse.json({ message: 'Already exists' });
    }

    const newUpdate = await Update.create({
      type: 'linkedin',
      content,
      mediaUrl,
      url,
      postedAt: new Date(),
      externalId,
    });

    return NextResponse.json({ success: true, update: newUpdate });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create LinkedIn update' }, { status: 500 });
  }
}
