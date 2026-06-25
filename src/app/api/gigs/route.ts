import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, gigs: db.gigs });
}

export async function POST(request: Request) {
  try {
    const gigData = await request.json();
    const db = readDatabase();
    const user = db.user;

    const newGig = {
      ...gigData,
      id: `gig-${Date.now()}`,
      postedAt: new Date().toISOString(),
      applicantsCount: 0,
      status: 'active',
      brandId: user?.id || 'brand-generic',
      brandName: user?.companyName || user?.name || 'Incredible Brand',
      brandLogo: user?.avatar || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100'
    };

    db.gigs = [newGig, ...db.gigs];
    writeDatabase(db);

    return NextResponse.json({ success: true, gig: newGig });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
