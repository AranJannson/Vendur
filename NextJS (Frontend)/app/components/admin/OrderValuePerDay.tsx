'use client'

import { useUser } from "@stackframe/stack"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement);

export default function OrderValuePerDay() {
    const user = useUser();
    const allTeams = user!.useTeams();
    const orgID: string = allTeams[0]?.id;

    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {

            try {
                const response = await fetch('/api/analytics/admin/orderValuePerDay');

                const data = await response.json();



                const dates = Object.keys(data);
                const orders = Object.values(data)

                const chartFormattedData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Order Value',
                            data: orders,
                            backgroundColor: [
                                'rgb(3,75,252)',
                                'rgb(0,120,197)',
                                'rgb(4,20,99)',
                                'rgb(128,194,255)',
                                'rgb(85,37,186)',
                                'rgb(91,161,243)',
                                'rgb(27,10,174)',
                                'rgb(59,48,161)',
                                'rgb(150,142,234)',
                                'rgb(40,90,188)',
                            ],
                            borderColor: 'rgba(75, 192, 192, 1)',

                        },
                    ],
                };

                setChartData(chartFormattedData);

            } catch (error) {
                console.error('Failed to fetch chart data:', error);
            }
        }

        fetchData();
    }, [orgID]);

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "300px", height: "200px" }}>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true },
                    },
                }}
            />
        </div>
    );
}
