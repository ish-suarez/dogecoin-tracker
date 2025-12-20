import { NextResponse } from 'next/server';
import { getDogePrice } from '@/util/prisma_util/getDogePrice';
import { get } from 'http';

export default async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const dogePrice = await getDogePrice();
        return NextResponse.json({ message: `Doge price fetched successfully: ${dogePrice}` });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching Doge price' }, { status: 500 });
    }
}
