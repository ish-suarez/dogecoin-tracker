import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { Prices } from '@/util/interfaces';

// Get reference to dogePricesArchive model
const { dogePricesArchive } = prisma;

export async function GET(req: Request) {
    try {
        // Fetch all doge price archives
        const res = await dogePricesArchive.findMany({
            take: 30,
            orderBy: {
                createdAt: 'asc',
            },
        });
        // If no data found, return 404
        if (res.length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }
        // Map the data to desired format
        const prices: Prices[] = res.map(item => ({
            hour: `${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`,
            price: item.price,
        }));
        // Return the prices as JSON response
        return NextResponse.json({ prices }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}