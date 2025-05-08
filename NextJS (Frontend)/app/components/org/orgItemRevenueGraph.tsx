'use client'

import { useUser } from "@stackframe/stack"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement);

export default function OrgItemRevenueGraph() {
    const user = useUser();
    const allTeams = user!.useTeams();
    const orgID: string = allTeams[0]?.id;

    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            if (!orgID) return;

            try {
                const response = await fetch('http://localhost:8001/oneOrgRevTest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ org_id: orgID }),
                });

                const data = await response.json();



                const item = Object.keys(data);
                const revenue = Object.values(data)
                console.log("Dates:", item);
                console.log("Reviews:", revenue);

                const chartFormattedData = {
                    labels: item,
                    datasets: [
                        {
                            label: 'Item Revenue',
                            data: revenue,
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
                console.log("Chart data to be set:", chartFormattedData);
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
        <div className="">
            <Bar
                data={chartData}
                width = {400}
                height= {300}
                options={{
                    scales: {
                        y: {
                            // beginAtZero: true,
                        }
                    }
                }}
            />
        </div>
    );
}
