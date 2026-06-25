import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, escrow: db.escrow });
}

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = readDatabase();

    db.escrow = db.escrow.map(l => {
      if (l.id === id) {
        let lockedI = l.lockedINR;
        let lockedU = l.lockedUSD;
        let relI = l.releasableINR;
        let relU = l.releasableUSD;
        if (status === 'Completed') {
          lockedI = 0; lockedU = 0; relI = 0; relU = 0;
        } else if (status === 'Hold') {
          lockedI = l.totalINR; lockedU = l.totalUSD; relI = 0; relU = 0;
        } else if (status === 'Releasing') {
          lockedI = 0; lockedU = 0; relI = l.totalINR; relU = l.totalUSD;
        } else {
          lockedI = l.totalINR; lockedU = l.totalUSD; relI = 0; relU = 0;
        }
        return { 
          ...l, 
          status, 
          lockedINR: lockedI, 
          lockedUSD: lockedU, 
          releasableINR: relI, 
          releasableUSD: relU, 
          lastUpdated: new Date().toISOString().split('T')[0] 
        };
      }
      return l;
    });

    writeDatabase(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
