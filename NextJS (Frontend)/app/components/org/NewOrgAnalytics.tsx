import {stackServerApp} from "@/stack";

type AvgItemPrice = {
    category: string;
    avgPrice: number;
};

export default async function OrgAnalytics(){
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();
    const orgID: string = allTeams[0]?.id;

    const response = await fetch('http://localhost:8001/avgItemPriceCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgID }),
    });

    const data = await response.json();
    return(

        <div>
            <h1 className="font-bold text-xl mb-4">Analytics</h1>
            {JSON.stringify(data)}
        </div>


    );
}