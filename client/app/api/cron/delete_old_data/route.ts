import { NextResponse } from 'next/server';
import { deleteOldData } from '@/util/prisma_util/deleteOldData';

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const deletedData = await deleteOldData();

        return NextResponse.json({ message: `Old records deleted successfully. Count: ${deletedData?.count || 0}` });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting old records' }, { status: 500 });
    }
}