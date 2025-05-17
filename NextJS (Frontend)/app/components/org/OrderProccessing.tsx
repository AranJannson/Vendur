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

type Entry = {
  item: {
    id: number;
    name: string;
    // add more fields as needed
  };
  order: {
    id: number;
    item_id: number;
    quantity: number;
    // ...
  };
  order_groups: {
    id: number;
    full_name: string;
    total_cost: number;
    delivery_address: string;
    // ...
  }[];
};

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

    const json = await response.json();
    console.log("Full response [OrderProcessing]:", json);

    const items = json;

    //Temp data for testing. Connect with api fetch for real functionality
    // const testOrderGroups: ItemsGroup[] = [
    //     {
    //         id: 'group-001',
    //         full_name: 'Temp User',
    //         total_cost: 100,
    //         delivery_address: 'Random House, UK',
    //         status: 'Completed',
    //         items: [
    //             {
    //                 id: 'item-001',
    //                 orderID: 1,
    //                 name: 'Temp Item',
    //                 quantity: 2,
    //                 status: 'Awaiting Confirmation',
    //             },
    //             {
    //                 id: 'item-002',
    //                 orderID: 2,
    //                 name: 'Temp Item 2',
    //                 quantity: 1,
    //                 status: 'Confirmed',
    //             },
    //         ],
    //     }
    // ];

    const orderGroupsMap = new Map<number, ItemsGroup>();

    items.forEach((entry: Entry) => {
    const { item, order, order_groups } = entry;
    const group = order_groups[0];

    if (!group) return;

    const existingGroup = orderGroupsMap.get(group.id);

    const itemEntry = {
        id: `item-${item.id}`,
        orderID: order.id,
        name: item.name,
        quantity: order.quantity,
        status: "Awaiting Confirmation",
    };

    if (existingGroup) {
        existingGroup.items.push(itemEntry);
    } else {
        orderGroupsMap.set(group.id, {
        id: `group-${group.id}`,
        full_name: group.full_name,
        total_cost: group.total_cost,
        delivery_address: group.delivery_address,
        status: "Completed",
        items: [itemEntry],
        });
    }
    });

    // Final array:
    const OrderGroups: ItemsGroup[] = Array.from(orderGroupsMap.values());

    return (
        <div className="bg-primary-100 shadow-xl rounded-xl p-4 w-full max-h-[39rem] flex flex-col">
            <h1 className="font-bold text-xl mb-4">Orders</h1>
            {OrderGroups.map(group => (
                <div key={group.id} className="flex-1 overflow-y-auto pr-2">
                    <OrderProcessingItems order_group={[group]} />
                </div>
            ))}
        </div>
    );

}