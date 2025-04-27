'use client'

import { useEffect, useState } from 'react';

type AvgItemPrice = {
    category: string;
    avgPrice: number;
};

export default function AdminAnalytics() {
    const [data, setData] = useState<AvgItemPrice[]>([]);

    useEffect(() => {
        const fetchAvgPrice = async () => {
            try {
                const response = await fetch('http://localhost:8001/avgItemPriceCategory');
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error('Failed to fetch average price data:', error);
            }
        };

        fetchAvgPrice();
    }, []);
    return (
        <div className="p-4 bg-primary-200 rounded-md shadow">
            <h2 className="text-lg font-semibold mb-2">Average Item Price Per Category</h2>
            <ul className="bg-background-400 rounded-xl p-4 border border-primary-600 text-sm">
                {data.length > 0 ? (
                    data.map(({ category, avgPrice }) => (
                        <li key={category} className="flex justify-between mb-2">
                            <span>{category}</span>
                            <span>£{avgPrice}</span>
                        </li>
                    ))
                ) : (
                    <li>No data available</li>
                )}
            </ul>
        </div>
    );
}