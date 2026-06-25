import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, user: db.user });
}

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();
    const db = readDatabase();

    let name = 'Guest User';
    let companyName = undefined;
    let title = undefined;

    if (role === 'creator') {
      name = 'Ananya Sharma';
      title = 'UGC Creator & Content Strategist';
    } else if (role === 'brand') {
      name = 'Sarah Jenkins';
      companyName = 'SkinGlow India';
    } else if (role === 'admin') {
      name = 'Admin Director';
    }

    const user = {
      id: role === 'creator' ? 'creator-1' : role === 'brand' ? 'brand-skinglow' : 'admin-1',
      name,
      email,
      role,
      companyName,
      title,
      avatar: role === 'creator' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      joinedAt: new Date().toISOString()
    };

    db.user = user;
    writeDatabase(db);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
