import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, applications: db.applications });
}

export async function POST(request: Request) {
  try {
    const { gigId, pitch, portfolioLink, rate } = await request.json();
    const db = readDatabase();
    const user = db.user;
    const gig = db.gigs.find(g => g.id === gigId);

    if (!gig) {
      return NextResponse.json({ success: false, error: 'Gig not found' }, { status: 404 });
    }

    const newApp = {
      id: `app-${Date.now()}`,
      gigId,
      gigTitle: gig.title,
      brandId: gig.brandId,
      brandName: gig.brandName,
      creatorId: user?.id || 'creator-anonymous',
      creatorName: user?.name || 'Anonymous Creator',
      creatorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      creatorTitle: user?.title || 'UGC Creator',
      pitch,
      portfolioLink,
      rate,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    db.gigs = db.gigs.map(g => {
      if (g.id === gigId) {
        return { ...g, applicantsCount: g.applicantsCount + 1 };
      }
      return g;
    });

    db.applications = [newApp, ...db.applications];
    writeDatabase(db);

    return NextResponse.json({ success: true, application: newApp });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = readDatabase();

    db.applications = db.applications.map(app => 
      app.id === id ? { ...app, status } : app
    );

    writeDatabase(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
