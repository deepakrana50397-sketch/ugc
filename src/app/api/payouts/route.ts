import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, payouts: db.payouts });
}

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = readDatabase();

    db.payouts = db.payouts.map(p => 
      p.id === id ? { ...p, status } : p
    );

    writeDatabase(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
