import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Update from '@/models/Update';

export async function POST() {
  try {
    await dbConnect();
    const response = await fetch('https://api.github.com/users/Kalpit0710/events', {
      headers: {
        'User-Agent': 'Kalpit-Portfolio',
      },
    });

    let newUpdatesCount = 0;

    // Also fetch repositories to backfill history if no recent events exist
    const repoResponse = await fetch('https://api.github.com/users/Kalpit0710/repos?sort=updated&per_page=5', {
      headers: { 'User-Agent': 'Kalpit-Portfolio' },
    });
    
    if (repoResponse.ok) {
      const repos = await repoResponse.json();
      for (const repo of repos) {
        const externalId = `github-repo-${repo.id}`;
        const existing = await Update.findOne({ externalId });
        if (!existing) {
          await Update.create({
            type: 'github',
            content: `Updated repository: ${repo.name}${repo.description ? ` - ${repo.description}` : ''}`,
            url: repo.html_url,
            postedAt: new Date(repo.updated_at),
            externalId,
          });
          newUpdatesCount++;
        }
      }
    }

    if (!response.ok) return NextResponse.json({ success: true, newUpdatesCount, message: 'Only synced repos' });
    
    const events = await response.json();

    if (Array.isArray(events)) {
      for (const event of events) {
        if (event.type === 'PushEvent') {
          const commit = event.payload?.commits?.[0];
          const commitMsg = commit?.message ? `"${commit.message}"` : `to ${event.payload?.ref?.split('/').pop() || 'branch'}`;
          
          const externalId = `github-push-${event.id}`;
          const existing = await Update.findOne({ externalId });
          if (!existing) {
            await Update.create({
              type: 'github',
              content: `Pushed ${commitMsg} in ${event.repo.name}`,
              url: commit ? `https://github.com/${event.repo.name}/commit/${commit.sha}` : `https://github.com/${event.repo.name}`,
              postedAt: new Date(event.created_at),
              externalId,
            });
            newUpdatesCount++;
          }
        } else if (event.type === 'CreateEvent' && event.payload?.ref_type === 'repository') {
          const externalId = `github-create-${event.id}`;
          const existing = await Update.findOne({ externalId });
          if (!existing) {
            await Update.create({
              type: 'github',
              content: `Created a new repository: ${event.repo.name}`,
              url: `https://github.com/${event.repo.name}`,
              postedAt: new Date(event.created_at),
              externalId,
            });
            newUpdatesCount++;
          }
        }
      }
    }

    return NextResponse.json({ success: true, newUpdatesCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sync GitHub' }, { status: 500 });
  }
}
