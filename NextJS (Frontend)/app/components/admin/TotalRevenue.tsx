'use client'

import { useUser } from "@stackframe/stack"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement);

export default function TotalRevenue() {
    const user = useUser();
    const allTeams = user!.useTeams();
    const orgID: string = allTeams[0]?.id;

    const [total, setTotal] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {

            try {
                console.log("Fetching from ")
                const response = await fetch('api/analytics/admin/totalRevenue');
                console.log("Fetch response", response)

                const data = await response.json();
                setTotal(data);

            } catch (error) {
                console.error('Failed to fetch chart data:', error);
                setTotal(null);
            }
        }

        fetchData();
    }, [orgID]);

    if (total==null) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ fontSize: "24px", fontWeight: "bold", padding: "1rem" }}>
            {total}
        </div>
    );
}
