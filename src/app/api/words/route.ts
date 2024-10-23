// app/api/words/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const words = await prisma.wordBank.findMany();
        return NextResponse.json(words);
    } catch (error) {
        console.error('Error fetching words:', error);
        return NextResponse.json({ error: 'Error fetching words' }, { status: 500 });
    }
}
