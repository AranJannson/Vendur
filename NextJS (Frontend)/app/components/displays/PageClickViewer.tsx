'use client';

import { useEffect, useState } from 'react';

type PageClickTable = {
    page: string;
    count: number;
};

export default function PageClickViewer() {
    const [data, setData] = useState<PageClickTable[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8001/pages-clicks');
                const json = await response.json();

                setData(json);

                console.log(JSON.stringify(json));

            } catch (err) {
                console.error('Failed to fetch click data:', err);
            }
        };

        fetchData();

        const refreshTimer = setInterval(fetchData, 3000);

        return () => {
            clearInterval(refreshTimer);
        };
    }, []);


    return (
        <div className="p-4 bg-primary-200 rounded-md shadow">
            <h2 className="text-lg font-semibold mb-2">Top 5 Most Interacted Pages</h2>
            <ul className="text-sm">
                {data.slice(0, 5).map(({ page, count }) => (
                    <li key={page} className="flex justify-between bg-background-400 rounded-xl p-2 mb-2 border border-primary-600">
                        <span>{page}</span>
                        <span className="">{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
