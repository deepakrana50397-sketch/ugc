import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, risk: db.risk });
}

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = readDatabase();

    db.risk = db.risk.map(r => 
      r.id === id ? { ...r, status } : r
    );

    writeDatabase(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
