"use client";
import { useState, useEffect } from "react";
import { LineChart } from "../components/LineChart";
import { DogePricesArchive } from "@/lib/generated/prisma/client";

export default function Page() {
    // use state to hold doge prices
    const [prices, setPrices] = useState<DogePricesArchive[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchDogePrices = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/doge_prices', { method: 'GET' });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            const dogePrices = data.prices as DogePricesArchive[];
            console.log('Fetched Doge prices:', dogePrices);
            setPrices(dogePrices);
        } catch (error) {
            console.error('Error fetching Doge prices:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDogePrices();
        const updatePrice = async () => {
            try {
                const res = await fetch('/api/crypto_info', { method: 'GET' });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                await res.json(); // Consume the response body
            } catch (error) {
                console.error('Error updating Doge price:', error);
            }
        }
        // Update price immediately on mount
        updatePrice();
        // Set interval to update price every hour
        const interval = setInterval(() => {
            updatePrice();
            fetchDogePrices();

        }, 60_000); // 1 minute

        return () => clearInterval(interval);
    }, []);

    return (
        <> {loading ? <p>Loading...</p> :
            <LineChart
                className="h-96 w-full sm:w-1/2 md:1/4"
                data={prices}
                index="hour"
                categories={["price"]}
                valueFormatter={(number: number) =>
                    `${Intl.NumberFormat().format(number).toString()}`
                }
                yAxisWidth={60}
                startEndOnly
                connectNulls
                allowDecimals
                minValue={prices.map(i => i.price).reduce((a, b) => Math.min(a, b), Infinity) - 0.001}
                maxValue={prices.map(i => i.price).reduce((a, b) => Math.max(a, b), -Infinity) + 0.001}
                showLegend={false}
                showTooltip={true}
                xAxisLabel="Doge Price in USD"
            />
        }
        </>
    );

}
