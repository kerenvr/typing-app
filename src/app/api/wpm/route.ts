import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';


export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userid');

    try {
        const records = await prisma.wpm.findMany({ where: { userId } });
        return NextResponse.json(records, { status: 200 });
    } catch (error) {
        console.error("Error retrieving WPM records:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
