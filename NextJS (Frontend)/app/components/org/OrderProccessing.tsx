import { stackServerApp } from "@/stack";
import OrderProcessingItems from "@/app/components/org/OrderProccessingItems";

interface Items {
    id: string;
    orderID: number;
    name: string
    quantity: number;
    status: string;
}

interface ItemsGroup {
    id: string;
    full_name: string;
    total_cost: number;
    delivery_address: string;
    items: Items[];
    status: string;

}

export default async function OrderProcessing(){
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();

    const orgID: string = allTeams[0]?.id;

    const response = await fetch('http://localhost:3000/api/getOrderByOrg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgID }),
    });

    const items = await response.json();
    console.log(`Items: ${JSON.stringify(items)}`);


    //Temp data for testing. Connect with api fetch for real functionality
    const testOrderGroups: ItemsGroup[] = [
        {
            id: 'group-001',
            full_name: 'Temp User',
            total_cost: 100,
            delivery_address: 'Random House, UK',
            status: 'Completed',
            items: [
                {
                    id: 'item-001',
                    orderID: 1,
                    name: 'Temp Item',
                    quantity: 2,
                    status: 'Awaiting Confirmation',
                },
                {
                    id: 'item-002',
                    orderID: 2,
                    name: 'Temp Item 2',
                    quantity: 1,
                    status: 'Confirmed',
                },
            ],
        }
    ];


    return (
        <div className="bg-primary-100 shadow-xl rounded-xl p-4 w-full max-h-[39rem] flex flex-col">
            <h1 className="font-bold text-xl mb-4">Orders</h1>
            <div className="flex-1 overflow-y-auto pr-2">
                <OrderProcessingItems order_group={testOrderGroups}/>
            </div>
        </div>
    );

}