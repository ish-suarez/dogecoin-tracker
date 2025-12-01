"use client";
import { useState, useEffect } from "react";
import { LineChart } from "../components/LineChart";
import { DogePricesArchive } from "@/lib/generated/prisma/client";


const chartdata = [
    {
        date: "Jan 23",
        Price: 2890,
        Inverters: 2338,
    },
    {
        date: "Feb 23",
        SolarPanels: 2756,
        Inverters: 2103,
    },
    {
        date: "Mar 23",
        SolarPanels: 3322,
        Inverters: 2194,
    },
    {
        date: "Apr 23",
        SolarPanels: 3470,
        Inverters: 2108,
    },
    {
        date: "May 23",
        SolarPanels: 3475,
        Inverters: 1812,
    },
    {
        date: "Jun 23",
        SolarPanels: 3129,
        Inverters: 1726,
    },
    {
        date: "Jul 23",
        SolarPanels: 3490,
        Inverters: 1982,
    },
    {
        date: "Aug 23",
        SolarPanels: 2903,
        Inverters: 2012,
    },
    {
        date: "Sep 23",
        SolarPanels: 2643,
        Inverters: 2342,
    },
    {
        date: "Oct 23",
        SolarPanels: 2837,
        Inverters: 2473,
    },
    {
        date: "Nov 23",
        SolarPanels: 2954,
        Inverters: 3848,
    },
    {
        date: "Dec 23",
        SolarPanels: 3239,
        Inverters: 3736,
    },
]

export default function Page() {

    const [prices, setPrices] = useState<DogePricesArchive[]>([]);

    const fetchDogePrices = async () => {
        try {
            const res = await fetch('/api/doge_prices', { method: 'GET' });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            const dogePrices = data.prices as DogePricesArchive[];
            setPrices(dogePrices);
        } catch (error) {
            console.error('Error fetching Doge prices:', error);
            return [];
        }
    }

    useEffect(() => {
        fetchDogePrices();
    }, [])





    return (
        <LineChart
            className="h-56"
            data={chartdata}
            index="hour"
            categories={["temperature"]}
            valueFormatter={(number: number) =>
                `${Intl.NumberFormat().format(number).toString()}°C`
            }
            yAxisWidth={40}
            startEndOnly
            connectNulls
            showLegend={false}
            showTooltip={false}
            xAxisLabel="24H Temperature Readout (Zurich)"
        />
    );
}
