import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
const DOGE_ID = process.env.DOGE_ID; // CoinMarketCap ID for Dogecoin    

// Get reference to dogePricesArchive model
const { dogePricesArchive } = prisma;

export default async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        // Fetch latest Dogecoin price from CoinMarketCap API
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
        // Parse the JSON response
        const data = await res.json();
        // Extract Dogecoin price from the response
        const dogePrice = data.data[Number(DOGE_ID)].quote.USD.price;
        // Store the fetched price in the database
        await dogePricesArchive.create({ data: { price: dogePrice } })
        // Return the fetched price as JSON response
        return NextResponse.json({ data: dogePrice }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching Doge price' }, { status: 500 });
    }

}
