import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, creators: db.creators });
}

export async function PUT(request: Request) {
  try {
    const creatorData = await request.json();
    const db = readDatabase();
    const user = db.user;

    const newCreator = {
      id: user?.id || `creator-${Date.now()}`,
      name: user?.name || creatorData.name || 'New Creator',
      avatar: user?.avatar || creatorData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      title: creatorData.title || 'UGC Video Creator',
      bio: creatorData.bio || '',
      category: creatorData.category || 'video_creator',
      location: creatorData.location || 'India',
      rating: 5.0,
      completedJobs: 0,
      skills: creatorData.skills || [],
      startingRate: creatorData.startingRate || { INR: 2000, USD: 30 },
      portfolio: creatorData.portfolio || [],
      socials: creatorData.socials || {},
      isFeatured: false,
      isVerified: false,
      ...creatorData
    };

    const exists = db.creators.some(c => c.id === newCreator.id);
    db.creators = exists
      ? db.creators.map(c => c.id === newCreator.id ? newCreator : c)
      : [newCreator, ...db.creators];

    if (user) {
      user.name = newCreator.name;
      user.title = newCreator.title;
      user.avatar = newCreator.avatar;
      db.user = user;
    }

    writeDatabase(db);

    return NextResponse.json({ success: true, creator: newCreator, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
