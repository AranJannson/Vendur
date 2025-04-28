'use client';

import { useEffect, useState } from 'react';

type AvgItemPrice = {
    category: string;
    avgPrice: number;
};



export default function OrgAnalytics() {
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

        fetchAvgPrice(); // <-- You need to actually call it!
    }, []); // <-- Empty array means run once when page loads
    return(

                <div>
                    <h1 className="font-bold text-xl mb-4">Analytics</h1>
                    {JSON.stringify(data)}
                </div>


    );
}