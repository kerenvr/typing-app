import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const difficulty = searchParams.get('difficulty'); // This can be string or null

        // Prepare the filter for Prisma
        const filter = difficulty ? { difficulty } : {}; // If difficulty is null, return all words

        const words = await prisma.wordBank.findMany({
            where: filter,
        });

        if (words.length === 0) {
            return NextResponse.json({ message: 'No words found for this difficulty level.' }, { status: 404 });
        }

        return NextResponse.json(words);
    } catch (error) {
        console.error('Error fetching words:', error);
        return NextResponse.json({ error: 'Error fetching words' }, { status: 500 });
    }
}
