"use server";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

const DOGE_ID = Number(process.env.DOGE_ID); // CoinMarketCap ID for Dogecoin    

const { dogePricesArchive } = prisma;

export async function GET(req: Request) {
    try {
        const res = await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${DOGE_ID}`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'Accept-Encoding': 'deflate, gzip',
                    'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY!,
                },
            }
        );
        const data = await res.json();
        // Extract Dogecoin price from the response
        const dogePrice = data.data[DOGE_ID].quote.USD.price;
        // Store the fetched price in the database
        await dogePricesArchive.create({data: {price: dogePrice}})

        return NextResponse.json({ data: dogePrice }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

}

export async function POST(req: Request) {
    




    return NextResponse.json({ message: 'POST method not implemented' }, { status: 501 });
}