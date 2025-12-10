"use client";
import { useState, useEffect } from "react";
import { LineChart } from "../components/LineChart";
import { Prices } from '@/util/interfaces'

export default function Page() {
    // region State Management
    // use state to hold doge prices
    const [prices, setPrices] = useState<Prices[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    //fetch Doge prices from the api
    const fetchDogePrices = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/doge_prices', { method: 'GET' });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            // Receive data
            const data: { prices: Prices[] } = await res.json(); 
            // Update 
            console.log(data.prices)
            const dogePrices = data.prices
            // Update state with fetched prices
            setPrices(dogePrices); 
            // Return fetched prices
            return dogePrices;
        } catch (error) {
            console.error('Error fetching Doge prices:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    // region UseEffect
    useEffect(() => {
        // Initial fetch of Doge prices
        fetchDogePrices();
        // Function to update Doge price
        const updatePrice = async () => {
            try {
                // Call the API to update Doge price
                const res = await fetch('/api/crypto_info', { method: 'GET' });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                // Consume the response body
                await res.json(); 
            } catch (error) {
                console.error('Error updating Doge price:', error);
            }
        }
        // Update price immediately on mount
        updatePrice();

        // Set interval to update price every minute
        const interval = setInterval(() => {
            updatePrice();
            fetchDogePrices();

        }, 60_000 * 60); // 1 hour

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
                yAxisWidth={100}
                startEndOnly
                connectNulls
                allowDecimals
                minValue={prices.map(i => i.price).reduce((a, b) => Math.min(a, b), Infinity) - 0.001}
                maxValue={prices.map(i => i.price).reduce((a, b) => Math.max(a, b), -Infinity) + 0.001}
                showLegend={true}
                showTooltip={true}
                xAxisLabel="Doge Price in USD"
            />
        }
        </>
    );

}
