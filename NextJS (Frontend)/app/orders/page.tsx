"use client";
import { useUser } from "@stackframe/stack"
import {useEffect, useState} from "react";

interface Order {
    id: number;
    created_at: string;
    item_id: number | null;
    quantity: number | null;
    familyFriendly: number | null;
    group_id: number | null;
    status: string;
    item: Item | null;
}

interface DeliveryAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
}

interface Item {
    id: number;
    name: string;
    image: string;
    category: string;
    description: string;
    discount: number;
    rating: number;
    price: number;
    org_id: string;
}


interface OrderGroup {
    id: number;
    user_id: string;
    ordered_at: string;
    delivery_address: DeliveryAddress;
    full_name: string;
    total_cost: number;
    orders: Order[];
}

export default function UserOrdersPage(){
    const user =  useUser({ or: 'redirect' });

    const userId = user?.id;

    const [orderGroups, setOrderGroups] = useState<OrderGroup[] | null>(null);


    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return;

            try {
                const response = await fetch("http://localhost:3000//api/getAllUserOrders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: user.id }),
                });

                const json = await response.json();
                const groups = json.orderDetails;

                const groupsWithItemDetails = await Promise.all(
                    groups.map(async (group: OrderGroup) => {
                        const itemDetailOrders = await Promise.all(
                            group.orders.map(async (order: Order) => {
                                const itemResponse = await fetch("http://localhost:3000//api/getItemByID", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ id: order.item_id }),
                                });

                                const item: Item = await itemResponse.json();
                                return { ...order, item };
                            })
                        );
                        return { ...group, orders: itemDetailOrders };
                    })
                );

                setOrderGroups(groupsWithItemDetails);
            } catch (error) {
                console.error("Failed to fetch enriched orders:", error);
                setOrderGroups([]);
            } finally {

            }
        };

        fetchOrders();
    }, [userId]);


    return(

        <div className="p-4 text-center">

            <h1 className="text-3xl font-bold mb-4">My Orders</h1>

            {orderGroups?.map((group) => (
                <div key={group.id} className="border p-4 rounded m-4 rounded-lg bg-primary-300">
                    <h2 className="text-xl font-semibold text-left pl-4">Order Number: {group.id}</h2>
                    <ul className="ml-4 mt-2 flex flex-row gap-4 bg-background-200 p-4 rounded-lg overflow-x-scroll">
                        {group.orders?.map((order) => (
                            <li key={order.id}>

                                <div className="grid grid-cols-1 bg-background-100 rounded-lg p-4 gap-4">
                                    <div className="bg-primary-300 w-fit h-fit rounded-lg aspect-square flex items-center justify-center">
                                        <img src={order.item?.image} width={200} height={200}/>
                                    </div>

                                    <div>
                                        <div className="flex flex-row gap-2">
                                            <h2 className="font-bold">Item Order Number: </h2>
                                            <h2 className="">{order.id}</h2>

                                        </div>

                                        <div className="flex flex-row gap-2">
                                            <h2 className="font-bold">Order Item: </h2>
                                            <h2 className="">{order.item?.name}</h2>

                                        </div>

                                        <div className="flex flex-row gap-2">
                                            <h2 className="font-bold">Order Status: </h2>
                                            <h2 className="">{order.status}</h2>

                                        </div>


                                    </div>
                                </div>


                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>

    );
}