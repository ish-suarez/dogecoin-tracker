import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

const { dogePricesArchive } = prisma;

export async function GET(req: Request) {
    try {
        const res = await dogePricesArchive.findMany();
        
        if (res.length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }
        const prices = res.map(item => ({
            hour: `${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`,
            price: item.price,
        }));

        
        return NextResponse.json({ prices }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}